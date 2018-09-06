<template>
    <div class="gf-table-container" :style="styles">
        <div :class="classes">
            <div class="gf-table-header" ref="header">
                <table-head
                    :prefix-cls="prefixCls"
                    :styleObject="tableHeaderStyle"
                    :columns="cloneColumns"
                    :columnsRow="ColumnsRow"
                    :columns-width="columnsWidth"
                    :data="currentTableData"
                    :obj-data="objData"
                ></table-head>
            </div>
            <div v-if="currentTableData.length !== 0" :class="bodyClasses" :style="bodyStyle" ref="body" @scroll="handleBodyScroll">
                <table-body
                    ref="tbody"
                    :prefix-cls="prefixCls"
                    :styleObject="tableStyle"
                    :columns="cloneColumns"
                    :columns-width="columnsWidth"        
                    :data="currentTableData"
                    :obj-data="objData"
                    :draggable="draggable"
                    @drag-change-data-sort="dragChangeData">
                </table-body> 
            </div>
            <div :class="[prefixCls + '-nodata']" v-else>
                <slot name="nodata">
                    <div :class="[prefixCls + '-nodata-default']">
                        暂无数据
                    </div>
                </slot>
            </div>
            <div :class="[prefixCls + '-fixed']" :style="fixedTableStyle" v-if="isLeftFixed">
                <div :class="fixedHeaderClasses">
                    <table-head
                        fixed="left"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedTableStyle"
                        :columns="leftFixedColumns"
                        :columnsRow="ColumnsRow"
                        :fixed-column-rows="leftFixedColumnRows"
                        :obj-data="objData"
                        :columns-width="columnsWidth"
                        :data="rebuildData"></table-head>
                </div>
                <div :class="[prefixCls + '-fixed-body']" :style="fixedBodyStyle" ref="fixedBody" @mousewheel="handleFixedMousewheel" @DOMMouseScroll="handleFixedMousewheel">
                    <table-body
                        fixed="left"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedTableStyle"
                        :columns="leftFixedColumns"
                        :data="rebuildData"
                        :columns-width="columnsWidth"
                        :obj-data="objData"
                        :draggable="draggable"
                        @drag-change-data-sort="dragChangeData">
                    </table-body>
                </div>
            </div>
            <div :class="[prefixCls + '-fixed-right']" :style="fixedRightTableStyle" v-if="isRightFixed">
                <div :class="fixedHeaderClasses">
                    <table-head
                        fixed="right"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedRightTableStyle"
                        :columns="rightFixedColumns"
                        :columnsRow="ColumnsRow"
                        :fixed-column-rows="rightFixedColumnRows"
                        :obj-data="objData"
                        :columns-width="columnsWidth"
                        :data="rebuildData"></table-head>
                </div>
                <div :class="[prefixCls + '-fixed-body']" :style="fixedBodyStyle" ref="fixedRightBody" @mousewheel="handleFixedMousewheel" @DOMMouseScroll="handleFixedMousewheel">
                    <table-body
                        fixed="right"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedRightTableStyle"
                        :columns="rightFixedColumns"
                        :data="rebuildData"
                        :columns-width="columnsWidth"
                        :obj-data="objData"
                        :draggable="draggable"
                        @drag-change-data-sort="dragChangeData"></table-body>
                </div>
            </div>
            <div :class="[prefixCls + '-fixed-right-header']" :style="fixedRightHeaderStyle" v-if="isRightFixed"></div>
            <div :class="[prefixCls + '-page']" v-if="showPage" ref="page">
                <table-page
                    :prefix-cls="prefixCls"
                    :pageSize="pageData.pageSize"
                    :currentPage="pageData.currentPage"
                    :totalPage="pageData.totalPage"
                    :totalItem="this.rebuildData.length"
                    :isServerPage="isServerPage"
                    @onChangePage="changePage">
                </table-page>
            </div>   
        </div>
        <transition name="fade">
            <div :class="[prefixCls + '-loading']" v-if="loading">
                <slot name="loading">
                    <div class="gf-spin-main">
                        <i class="spin-icon-load gf-icon icon-load-c" style="font-size: 18px;"></i> 
                        <div>Loading</div>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
    import tableHead from './table-head.vue'
    import tableBody from './table-body.vue'
    import tablePage from './table-page.vue'
    import {getStyle, deepCopy, getScrollBarSize, on, off} from '../utils'
    import mixin from './mixin'

    const prefixCls = 'gf-table'
    let columnKey = 1
    let rowKey = 1
    
    export default {
        name: 'gf-table',
        mixins :[ mixin ],
        components:{
            tableHead,
            tableBody,
            tablePage
        },
        props:{
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            columns: {
                type: Array,
                default () {
                    return [];
                }
            },
            height: {
                type: [Number, String]
            },
            width: {
                type: [Number, String]
            },
            page: {
                type: Object,
                default () {
                    return {}
                }
            },
            disabledHover: {
                type: Boolean,
                default () {
                    return false
                }
            },
            //设置行Class
            rowClassName: {
                type: Function,
                default () {
                    return '';
                }
            },
            stripe: {
                type:Boolean,
                default: false
            },
            border: {
                type:Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            draggable: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                prefixCls: prefixCls,
                tableData: this.makeData(this.data),
                objData: this.makeObjData(),     // 状态管理对象
                cloneColumns: this.makeColumns(),
                ColumnsRow: this.conversionColumn(this.columns),
                leftFixedColumnRows: this.conversionColumn(this.columns, 'left'),
                rightFixedColumnRows: this.conversionColumn(this.columns, 'right'),
                scrollBarWidth: getScrollBarSize(),
                rebuildData: [],
                afterDragData: [],         //保存拖拽后的数据
                columnsWidth: {},
                bodyHeight: 0,
                tableWidth: 0,
                bodyRealHeight: 0,
                pageData: this.makePageData(this.page),
                currentSort:{},   //当远程分页时，记录当前排序规则 
                isScrollY:false,
                isScrollX:false,
                dragDisableHover: false      //解决拖动时表格hover的顺序不一样
            }  
        },
        created () {
            this.rebuildData = this.makeDataWithSortAndFilter()
            // this.afterDragData = this.makeDataWithSortAndFilter()
        },
        mounted() {
            this.handleResize()

            on(window, 'resize', this.handleResize)
        },
        beforeDestroy () {
            off(window, 'resize', this.handleResize)
        },
        computed:{
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-default`,
                    {
                        // [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-border`]: this.border,
                        [`${prefixCls}-stripe`]: this.stripe,
                        [`${prefixCls}-noPage`]: !this.showPage,
                    //     [`${prefixCls}-with-fixed-top`]: !!this.height
                    }
                ];
            },
            bodyClasses() {
                return [
                    `${prefixCls}-body`,
                    {
                        [`${prefixCls}-overflowY`]: ((this.bodyRealHeight > this.bodyHeight) && (this.bodyHeight != 0)),
                        [`${prefixCls}-overflowX`]: this.isScrollX
                    }
                ]
            },
            styles () {
                let style = {};
                if (this.height) {
                    // const height = (this.isLeftFixed || this.isRightFixed) ? parseInt(this.height) + this.scrollBarWidth : parseInt(this.height);
                    const height = parseInt(this.height)
                    style.height = `${height}px`
                }
                if (this.width) style.width = `${this.width}px`
                return style
            },
            tableStyle () {
                let style = {};
                if (this.tableWidth !== 0) {
                    let width = '';
                    if (this.bodyHeight === 0) {
                        width = this.tableWidth;
                    } else {
                        width = this.tableWidth - (this.isScrollY?this.scrollBarWidth:0);
                    }
//                    const width = this.bodyHeight === 0 ? this.tableWidth : this.tableWidth - this.scrollBarWidth;
                    style.width = `${width}px`;
                }
                return style;
            },
            tableHeaderStyle () {
                let style = {};
                if (this.tableWidth !== 0) {
                    let width = '';
                    width = this.tableWidth;
                    style.width = `${width}px`;
                }
                return style;
            },
            bodyStyle () {
                let style = {};
                if (this.bodyHeight !== 0) {
                    //如果有横向滚动条，则加一个滚动条高度
                    const height = this.bodyHeight;
                    style.height = `${height}px`;
                }
                return style;
            },
            fixedTableStyle () {
                let style = {};
                let width = 0;
                this.leftFixedColumns.forEach((col) => {
                    if (col.fixed && col.fixed === 'left') width += col._width;
                });
                style.width = `${width}px`;
                return style;
            },
            fixedRightTableStyle () {
                let style = {};
                let width = 0;
                this.rightFixedColumns.forEach((col) => {
                    if (col.fixed && col.fixed === 'right') width += col._width;
                });
                //width += this.scrollBarWidth;
                style.width = `${width}px`;
                style.right = `${this.isScrollY?this.scrollBarWidth:0}px`;
                return style;
            },
            showPage () {
                if(!this.pageData.pageSize) return false
                else{
                    if(!this.data)
                        return false
                    else if(!this.isServerPage && this.data.length <= this.pageData.pageSize){
                        return false
                    }else if(this.pageData.totalPage <= 1){
                        return false   
                    }else{
                        return true
                    }           
                }
            },
            //当前表格数据
            currentTableData() {
                const pageData = this.pageData
                if((pageData !== {} && pageData.totalPage > 1) && !this.isServerPage){
                    return this.rebuildData.slice((pageData.currentPage - 1) * pageData.pageSize, pageData.currentPage * pageData.pageSize)
                }else{
                    return this.rebuildData
                }
            },
            
            isServerPage() {
                if(this.pageData.isServerPage){
                    return true
                }else return false
            },
            isLeftFixed () {
                return this.columns.some(col => col.fixed && col.fixed === 'left');
            },
            isRightFixed () {
                return this.columns.some(col => col.fixed && col.fixed === 'right');
            },
            fixedHeaderClasses () {
                return [
                    `${prefixCls}-fixed-header`,
                    {
                        [`${prefixCls}-fixed-header-with-empty`]: !this.rebuildData.length
                    }
                ];
            },
            fixedBodyStyle () {
                let style = {};
                if (this.bodyHeight !== 0) {
                    let height = this.bodyHeight - (this.isScrollX?this.scrollBarWidth:0);
                    style.height = this.isScrollX ? `${height}px` : `${height - 1}px`;
                }
                return style;
            },
            //左浮动表格表头
            leftFixedColumns () {
                return this.convertColumnOrder(this.cloneColumns, 'left');
            },
            rightFixedColumns () {
                return this.convertColumnOrder(this.cloneColumns, 'right');
            },
            //当右侧有固定表头时，右侧滚动条表头的样式
            fixedRightHeaderStyle () {
                let style = {}
                let width = 0
                let height = parseInt(getStyle(this.$refs.header, 'height')) - 1
                if(this.isScrollY){
                    width = this.scrollBarWidth
                }
                style.width = `${width}px`
                style.height = `${height}px`
                return style
            },
        },
        watch: {
            data (newVal, oldVal) {
                // this.tableData = this.makeData(newVal)

                //如果当前为远程数据，则数据改变时不更新分页数据
                if(!this.isServerPage) this.pageData = this.makePageData(this.page)
                
                this.objData = this.makeObjData()

                const oldDataLen = this.rebuildData.length;
                this.rebuildData = this.makeDataWithSortAndFilter();
                this.handleResize();
                // if (!oldDataLen) {
                    
                // }
            },
            page: {
                handler (newVal, oldVal) {
                    this.pageData = this.makePageData(this.page)
                    
                    this.objData = this.makeObjData()

                    // const oldDataLen = this.rebuildData.length;
                    this.rebuildData = this.makeDataWithSortAndFilter();
                    this.handleResize();
                    // if (!oldDataLen) {
                    //     this.fixedHeader();
                    // }    
                },
                deep: true
            },
            columns: {
                handler (newVal, oldVal) {
                    // this.allColumns = getAllColumns(colsWithId);
                    this.cloneColumns = this.makeColumns();

                    this.ColumnsRow = this.conversionColumn(newVal);
                    this.leftFixedColumnRows = this.conversionColumn(newVal, 'left');
                    this.rightFixedColumnRows = this.conversionColumn(newVal, 'right');
                    this.rebuildData = this.makeDataWithSortAndFilter();
                    this.handleResize(); 
                },
                deep: true
            },
            isScrollX () {
                this.handleResize();
            },
            isScrollY () {
                this.handleResize();
            }
        },
        methods: {
            handleResize () {
                this.$nextTick(() => {
                    const allWidth = !this.cloneColumns.some(cell => !cell.width);
                    if (allWidth) {
                        this.tableWidth = this.cloneColumns.map(cell => cell.width).reduce((a, b) => a + b, 0);
                    } else {
                        this.tableWidth = parseInt(getStyle(this.$el, 'width')) - 1;
                    }
                    this.columnsWidth = {};
                    if (!this.$refs.tbody) return;
                    this.$nextTick(() => {
                        let columnsWidth = {};
                        let autoWidthIndex = -1;
                        if (allWidth) autoWidthIndex = this.cloneColumns.findIndex(cell => !cell.width);//todo 这行可能有问题

                        //获取每列宽度
                        if (this.data.length) {
                            const $td = this.$refs.tbody.$el.querySelectorAll('tbody tr')[0].children;
                            for (let i = 0; i < $td.length; i++) { 
                                const column = this.cloneColumns[i];

                                let width = parseInt(getStyle($td[i], 'width'));
                                if (i === autoWidthIndex) {
                                    width = parseInt(getStyle($td[i], 'width')) - 1;
                                }
                                if (column.width) width = column.width;

                                this.cloneColumns[i]._width = width;

                                columnsWidth[column._index] = {
                                    width: width
                                };
                            }
                            this.columnsWidth = columnsWidth;
                        }
                    });
                    // 获取表格实际高度，用来判断是否显示垂直滚动条
                    this.bodyRealHeight = parseInt(getStyle(this.$refs.tbody.$el, 'height'));
                    this.fixedHeader();
                });
            },
            fixedHeader () {
                if (this.height) {
                    this.$nextTick(() => {
                        // const titleHeight = parseInt(getStyle(this.$refs.title.$el, 'height')) || 0;
                        const headerHeight = parseInt(getStyle(this.$refs.header, 'height')) || 0
                        const pageHeight = this.showPage ? parseInt(getStyle(this.$refs.page, 'height')) : 0
                        // const footerHeight = parseInt(getStyle(this.$refs.footer.$el, 'height')) || 0;

                        if((this.bodyRealHeight < this.height - headerHeight - pageHeight) && this.bodyRealHeight == 0){
                            this.isScrollY = false
                            // this.bodyHeight = 0
                        }else{
                            this.bodyHeight = this.height - headerHeight - pageHeight
                            this.isScrollY = true
                        }
                        this.$nextTick(() => {
                            let bodyContentEl = this.$refs.tbody.$el;
                            let bodyEl = bodyContentEl.parentElement;
                            this.isScrollX = bodyEl.offsetWidth < bodyContentEl.offsetWidth + (this.isScrollY?this.scrollBarWidth:0);  
                        })
                                  
                    });
                } else {
                    this.isScrollY = false
                    this.bodyHeight = 0;

                    this.$nextTick(() => {
                        let bodyContentEl = this.$refs.tbody.$el;
                        let bodyEl = bodyContentEl.parentElement;

                        this.isScrollX = bodyEl.offsetWidth < bodyContentEl.offsetWidth + (this.isScrollY?this.scrollBarWidth:0);     
                    })
                }
            },
            //鼠标滑动行内触发
            handleMouseIn (_index) {
                if (this.disabledHover || this.dragDisableHover) return;
                if (this.objData[_index]._isHover) return;
                this.objData[_index]._isHover = true;
                // console.log('in', _index)
            },
            handleMouseOut (_index) {
                if (this.disabledHover || this.dragDisableHover) return;
                this.objData[_index]._isHover = false;
                // console.log('out', _index)
            },
            //滑动事件
            handleBodyScroll (event) {
                this.$refs.header.scrollLeft = event.target.scrollLeft;
                if (this.isLeftFixed) this.$refs.fixedBody.scrollTop = event.target.scrollTop;
                if (this.isRightFixed) this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
            },
            //复制对象用于状态管理
            makeObjData () {
                let data = {};
                this.data.forEach((row, index) => {
                    const newRow = deepCopy(row);// todo 直接替换
                    newRow._isHover = false;
                    if (newRow._disabled) {
                        newRow._isDisabled = newRow._disabled;
                    } else {
                        newRow._isDisabled = false;
                    }
                    if (newRow._checked) {
                        newRow._isChecked = newRow._checked;
                    } else {
                        newRow._isChecked = false;
                    }
                    if (newRow._expanded) {
                        newRow._isExpanded = newRow._expanded;
                    } else {
                        newRow._isExpanded = false;
                    }
                    if (newRow._highlight) {
                        newRow._isHighlight = newRow._highlight;
                    } else {
                        newRow._isHighlight = false
                    } 
                    data[index] = newRow;
                });
                return data;
            },
            //复制data
            makeData () {
                let data = deepCopy(this.data);
                data.forEach((row, index) => {
                    row._index = index;
                    row._rowKey = rowKey++;
                });
                return data;
            },
            //实际显示的数据，用于显示和排序
            makeDataWithSort () {
                let data = this.makeData();
                let sortType = 'normal';
                let sortIndex = -1;
                let isCustom = false;

                for (let i = 0; i < this.cloneColumns.length; i++) {
                    if (this.cloneColumns[i]._sortType !== 'normal') {
                        sortType = this.cloneColumns[i]._sortType;
                        sortIndex = i;
                        isCustom = this.cloneColumns[i].sortable === 'custom';
                        break;
                    }
                }

                if (sortType !== 'normal' && !isCustom) data = this.sortData(data, sortType, sortIndex);

                //初始化currentSort
                sortIndex = sortIndex === -1 ? 1 : sortIndex
                let temp = this.cloneColumns[sortIndex].key
                this.currentSort = {
                    key: temp,
                    type: sortType
                }
                return data;
            },
            // makeDataWithFilter () {
            //     let data = this.makeData();
            //     this.cloneColumns.forEach(col => data = this.filterData(data, col));
            //     return data;
            // },
            handleSort (index, type) {
                //修改当前排序规则
                let temp = this.cloneColumns[index].key
                this.currentSort = {
                    key: temp,
                    type: type
                }
                this.cloneColumns.forEach((col) => col._sortType = 'normal');

                const key = this.cloneColumns[index].key;
                if (this.cloneColumns[index].sortable !== 'custom') {    //排除远程排序
                    if (type === 'normal') {
                        // this.rebuildData = this.makeDataWithFilter();
                    } else {
                        this.rebuildData = this.sortData(this.rebuildData, type, index);
                    }
                }
                this.cloneColumns[index]._sortType = type;
      
                //触发外部事件
                this.$emit('on-sort-change', {
                    column: JSON.parse(JSON.stringify(this.columns[this.cloneColumns[index]._index])),
                    key: key,
                    order: type,
                    currentPage: this.pageData ? this.pageData.currentPage : undefined,
                    pageSize: this.pageData ? this.pageData.pageSize : undefined
                });
            },
            makeDataWithSortAndFilter () {
                let data = this.makeDataWithSort();
                // this.cloneColumns.forEach(col => data = this.filterData(data, col));
                return data;
            },
            // filterData (data, column) {
            //     return data.filter((row) => {
            //         //如果定义了远程过滤方法则忽略此方法
            //         if (typeof column.filterRemote === 'function') return true;

            //         let status = !column._filterChecked.length;
            //         for (let i = 0; i < column._filterChecked.length; i++) {
            //             status = column.filterMethod(column._filterChecked[i], row);
            //             if (status) break;
            //         }
            //         return status;
            //     });
            // },
            //排序方法
            sortData (data, type, index) {
                const key = this.cloneColumns[index].key;
                data.sort((a, b) => {
                    if (this.cloneColumns[index].sortMethod) {
                        return this.cloneColumns[index].sortMethod(a[key], b[key], type);
                    } else {
                        if (type === 'asc') {
                            return a[key] >= b[key] ? 1 : -1;
                        } else if (type === 'desc') {
                            return a[key] < b[key] ? 1 : -1;
                        }
                    }
                });
                return data;
            },
            //获取实际表头对象
            makeAllColumns (column, level){
                let temp = []
                if(!level) level = 0
                level++
                column.map( (item, index) => {
                    if(item.children && item.children instanceof Array){
                        let re = this.makeAllColumns(item.children, level)
                        temp = temp.concat(re.temp)
                        if(re.level > level)
                            level = re.level
                    }else{
                        temp.push(item)
                    }
                })
                return {temp, level}
            },

            //一维表头数组
            getAllColumn(array){
                let temp = []
                array.map( (item, index) => {
                    if(item.children && item.children instanceof Array){
                        temp.push(item)
                        temp = temp.concat(this.getAllColumn(item.children))
                        temp.col = item.children.length
                    }else{
                        temp.push(item)
                    }
                })
                return temp
            },
            //获取二维表头数组
            conversionColumn (columns, fixedType) {
                const array = fixedType ? fixedType === 'left' ? deepCopy(this.convertColumnOrder(columns, 'left')) : deepCopy(this.convertColumnOrder(columns, 'right')) : deepCopy(columns);

                let maxLevel = 1
                const cv = (column, father) => {
                    if(father) {
                        column.level = father.level + 1
                        if(column.level > maxLevel){
                            maxLevel = column.level
                        }
                    }else {
                        column.level = 1
                    }

                    if(column.children){
                        let col = 0
                        column.children.forEach( (sub) => {
                            cv(sub, column)
                            col += sub.col
                        })
                        column.col = col
                    }else{
                        column.col = 1
                    }
                }

                array.forEach( (item) => {
                    cv(item)
                })
                
                // console.log(array)
                let calcArray = []
                for (let i = 0; i < maxLevel; i++) {
                    calcArray.push([])
                }

                let allColumn = this.getAllColumn(array)
                
                allColumn.forEach( (item) => {
                    if (!item.children){
                        item.row = maxLevel - item.level + 1
                    }else{
                        item.row = 1
                    }
                    
                    calcArray[item.level - 1].push(item)
                })

                return calcArray
            },
            //复制表头数据，添加状态标识
            makeColumns () {
                let columns = deepCopy(this.columns);
                columns = this.makeAllColumns(columns).temp
                let left = [];
                let right = [];
                let center = [];

                const draggable = this.draggable
                columns.forEach((column, index) => {
                    column._index = index;
                    column._columnKey = columnKey++;
                    column._width = column.width ? column.width : '';    // update in handleResize()
                    column._sortType = 'normal';
                    column._filterVisible = false;
                    column._isFiltered = false;
                    column._filterChecked = [];

                    // if ('filterMultiple' in column) {
                    //     column._filterMultiple = column.filterMultiple;
                    // } else {
                    //     column._filterMultiple = true;
                    // }
                    // if ('filteredValue' in column) {
                    //     column._filterChecked = column.filteredValue;
                    //     column._isFiltered = true;
                    // }

                    if((column.type && column.type == 'expand') && draggable){
                        console.error('不支持 行拖拽功能 与 行拓展功能 一起使用！请重新设置')
                    }

                    if ('sortType' in column) {
                        column._sortType = column.sortType;
                    }

                    if (column.fixed && column.fixed === 'left') {
                        left.push(column);
                    } else if (column.fixed && column.fixed === 'right') {
                        right.push(column);
                    } else {
                        center.push(column);
                    }
                });
                return left.concat(center).concat(right);
            },
            convertColumnOrder(columns, fixedType) {
                let list = [];
                let other = [];
                columns.forEach((col) => {
                    if (col.fixed && col.fixed === fixedType) {
                        list.push(col);
                    } else {
                        other.push(col);
                    }
                });
                return list.concat(other);
            },
            //处理分页对象
            makePageData() {
                const page = this.page
                if(!page || page == {} || !page.pageSize){
                    return {}
                }else{
                    if(page.isServerPage){
                        if(page.pageSize < this.data.length){
                            console.error("当表格为远程分页时，pageSize必须大于等于当前数据大小")
                            return {}
                        }
                        if(!page.totalPage){
                            console.error("当表格为远程分页时，必须设置totalPage")
                            return {}
                        }
                        if(!page.pagingCB || typeof page.pagingCB !== "function"){
                            console.error("当表格为远程分页时，必须设置翻页回调函数")
                            return {}
                        }

                        return {
                            pageSize: page.pageSize,
                            currentPage: page.currentPage ? parseInt(page.currentPage) : 1,
                            totalPage: page.totalPage,
                            isServerPage: true,
                            pagingCB: page.pagingCB
                        }
                    }else{
                        if(this.data.length <= page.pageSize){
                            return {}
                        }else{
                            return{
                                pageSize: this.page.pageSize,
                                currentPage:page.currentPage ? parseInt(page.currentPage) : 1,
                                totalPage: Math.ceil(this.data.length / this.page.pageSize)
                            }
                        }    
                    }    
                }
                
            },
            //页数改变事件
            changePage(from, to, pageSize) {
                if(!this.isServerPage){
                    if(to > this.pageData.totalPage)
                        to = this.pageData.totalPage
                    else if(to < 1)
                        to = 1
                }else{
                    this.pageData.pagingCB(from, to, pageSize, this.currentSort)
                }
                this.pageData.currentPage = to
            },
            //fixed区域鼠标滑轮事件
            handleFixedMousewheel(event) {
                let deltaY = event.deltaY;
                if(!deltaY && event.detail){
                    deltaY = event.detail * 40;
                }
                if(!deltaY && event.wheelDeltaY){
                    deltaY = -event.wheelDeltaY;
                }
                if(!deltaY && event.wheelDelta){
                    deltaY = -event.wheelDelta;
                }
                if(!deltaY) return;
                const body = this.$refs.body;
                const currentScrollTop = body.scrollTop;
                if (deltaY < 0 && currentScrollTop !== 0) {
                    event.preventDefault();
                }
                if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
                    event.preventDefault();
                }
                //body.scrollTop += deltaY;
                let step = 0;
                let timeId = setInterval(()=>{
                    step += 5;
                    if(deltaY>0){
                        body.scrollTop += 2;
                    }
                    else{
                        body.scrollTop -= 2;
                    }
                    if(step >= Math.abs(deltaY)){
                        clearInterval(timeId);
                    }
                }, 5);
            },
            //获取选中数据
            getSelection () {
                let selectionIndexes = [];
                for (let i in this.objData) {
                    if (this.objData[i]._isChecked) selectionIndexes.push(parseInt(i));
                }
                return JSON.parse(JSON.stringify(this.data.filter((data, index) => selectionIndexes.indexOf(index) > -1)));
            },
            selectAll(status) {
                for(const data of this.rebuildData){
                    if(this.objData[data._index]._isDisabled){
                        continue;
                    }else{
                        this.objData[data._index]._isChecked = status;
                    }
                }
                const selection = this.getSelection();
                if (status) {
                    this.$emit('on-select-all', selection);
                }
                this.$emit('on-selection-change', selection);
            },
            toggleSelect (_index) {
                let data = {};

                for (let i in this.objData) {
                    if (parseInt(i) === _index) {
                        data = this.objData[i];
                        break;
                    }
                }
                const status = !data._isChecked;

                this.objData[_index]._isChecked = status;

                const selection = this.getSelection();
                this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(this.data[_index])));
                this.$emit('on-selection-change', selection);
            },
            toggleExpand (_index) {
                let data = {};

                for (let i in this.objData) {
                    if (parseInt(i) === _index) {
                        data = this.objData[i];
                        break;
                    }
                }
                const status = !data._isExpanded;
                this.objData[_index]._isExpanded = status;
                this.$emit('on-expand', JSON.parse(JSON.stringify(this.data[_index])), status);
            },
            highlightCurrentRow (_index) {
                if (!this.highlightRow || this.objData[_index]._isHighlight) return;
                this.handleCurrentRow('highlight', _index);
            },
            clearCurrentRow () {
                if (!this.highlightRow) return;
                this.handleCurrentRow('clear');
            },
            clickCurrentRow (_index) {
                this.highlightCurrentRow (_index);
                this.$emit('on-row-click', JSON.parse(JSON.stringify(this.data[_index])), _index);
            },
            dblclickCurrentRow (_index) {
                this.highlightCurrentRow (_index);
                this.$emit('on-row-dblclick', JSON.parse(JSON.stringify(this.data[_index])), _index);
            },
            dragChangeData( data, newIndex, oldIndex, item) {
                // let clone = deepCopy(this.rebuildData)
                // let currentPage
                // if(this.pageData.pageSize){
                //     currentPage = this.pageData.currentPage
                //     // pageSize = this.pageData.pageSize
                // }
                // let temp
                // if(currentPage){
                //     const pageSize = this.pageData.pageSize
                //     newIndex = currentPage * pageSize + newIndex
                //     oldIndex = currentPage * pageSize + oldIndex
                // }    
                // temp = clone[newIndex]
                // clone[newIndex] = clone[oldIndex]
                // clone[oldIndex] = temp

                // this.rebuildData = clone
                this.rebuildData = data
                this.$emit('on-drag-end',newIndex, oldIndex, item)
            },
            clearHover() {
                for(let i in this.objData){
                    this.objData[parseInt(i)]._isHover = false
                }
                // this.dragDisableHover = true
            },
            getTableData() {
                const tempData = deepCopy(this.rebuildData)
                for(let value of tempData)
                {
                    delete value._index
                    delete value._rowKey
                }

                return tempData
            }
        },
    }
</script>

