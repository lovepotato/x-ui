<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styles">
        <colgroup>
            <col v-for="(column, index) in columns" :width="setCellWidth(column, index, true)">
            <col v-if="$parent.isScrollY" :width="$parent.scrollBarWidth"/>
        </colgroup>
        <thead>
            <tr v-for="(columns, trIndex) in headRows">
                <!-- <th v-for="(column, index) in columns" :class="alignCls(column)" :style="thStyle(column.sortable)" @click="handleSortByHead(column, index)">
                    <div :class="cellClasses(column)">
                        <span v-if="!column.renderHeader" >{{ column.title || '#' }}</span>
                        <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                            <i class="gf-icon icon-android-arrow-dropup" :class="{on: column._sortType === 'asc'}" @click.stop="handleSort(index, 'asc')"></i>
                            <i class="gf-icon icon-android-arrow-dropdown" :class="{on: column._sortType === 'desc'}" @click.stop="handleSort(index, 'desc')"></i>
                        </span>
                    </div>
                </th> --> 
                <th v-for="(column, thIndex) in columns" :colspan="column.col" :rowspan="column.row" :class="alignCls(column)" :style="thStyle(column.sortable)" @click="handleSortByHead(column, trIndex, thIndex)">
                    <div :class="cellClasses(column)">
                        <template v-if="column.type == 'expand'">
                            <span v-if="!column.renderHeader"> {{ column.title || '' }}</span>
                            <render-head v-else
                                :column='column'
                                :index="thIndex"
                                :render="column.renderHeader">
                            </render-head>
                        </template>
                        <template v-else-if="column.renderHeader" >
                            <render-head
                                :column='column'
                                :index="thIndex"
                                :render="column.renderHeader">
                            </render-head>
                        </template>
                        <template v-else-if="column.type == 'selection'">
                            <input type="checkbox" v-model="isAllSelect" @click.prevent.stop="selectionBox($event)">
                        </template>
                        <template v-else>
                            <span>{{ column.title || '#' }}</span>
                            <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                                <i class="gf-icon icon-android-arrow-dropup" :class="iconOn(trIndex, thIndex, 'asc')" @click.stop="handleSort(trIndex, thIndex, 'asc')"></i>
                                <i class="gf-icon icon-android-arrow-dropdown" :class="iconOn(trIndex, thIndex, 'desc')" @click.stop="handleSort(trIndex, thIndex, 'desc')"></i>
                            </span>
                        </template>
                    </div>
                </th>	
                <th v-if="$parent.isScrollY && trIndex===0" :class='scrollBarCellClass()' :rowspan="headRows.length"></th>
            </tr>  
        </thead>
    </table>        
</template>

<script>
    import Mixin from './mixin';
    import renderHead from './headRender'
 
    export default {
        name:'gf-table-head',
        mixins: [Mixin],
        components: {renderHead},
        props: {
            prefixCls: String,
            styleObject: Object,
            columns: Array,
            objData: Object,
            data: Array,    // rebuildDataData
            columnsWidth: Object,
            columnsRow: Array,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            fixedColumnRows: Array
        },
		methods: {
            cellClasses (column) {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')
                    }
                ];
            },
            handleSort (trindex, thindex, type) {
                let index = this.columns.findIndex( (item) => {
                    return item.key == this.columnsRow[trindex][thindex].key
                })
                if(index > -1){
                    if (this.columns[index]._sortType === type) {
                        type = 'normal'
                    }
                    this.$parent.handleSort(index, type)
                }
            },
            handleSortByHead (column, trindex, thindex) {
                if(!column.renderHeader){
                    let index = this.columns.findIndex( (item) => {
                        return item.key == this.columnsRow[trindex][thindex].key
                    })
                    if(index > -1){
                        const column = this.columns[index]
                        if (column.sortable) {
                            const type = column._sortType
                            if (type === 'normal') {
                                this.handleSort(trindex, thindex, 'asc')
                            } else if (type === 'asc') {
                                this.handleSort(trindex, thindex, 'desc')
                            } else {
                                this.handleSort(trindex, thindex, 'normal')
                            }
                        }
                    }
                }
                
            },
            scrollBarCellClass(){
                let hasRightFixed = false;
                for(let i in this.headRows){
                    for(let j in this.headRows[i]){
                        if(this.headRows[i][j].fixed === 'right') {
                            hasRightFixed=true;
                            break;
                        }
                        if(hasRightFixed) break;
                    }
                }
                return [
                    {
                        [`${this.prefixCls}-hidden`]: hasRightFixed
                    }
                ];
            },
            selectionBox(event) {
                // event.target.checked = !event.target.checked
                // if(this.isAllSelect === true){
                //     for (let i = 0; i < this.data.length; i++) {
                //         this.$parent.objData[this.data[i]._index]._isChecked = false
                //     }
                // }else{
                //     for (let i = 0; i < this.data.length; i++) {
                //         this.$parent.objData[this.data[i]._index]._isChecked = true
                //     }
                // }
                this.$parent.selectAll(!this.isAllSelect)
            }
		},
		computed: {
            styles () {
                const style = Object.assign({}, this.styleObject)
                const width = parseInt(this.styleObject.width) ;
                style.width = `${width}px`
                return style;
            },
            thStyle (sortable) {
                return (sortable) => {
                    if(sortable){
                        return {
                            cursor: 'pointer',
                            userSelect: 'none'
                        }
                    }else{
                        return {}
                    }
                }
            },
            
            iconOn(trindex, thindex, type){
                return (trindex, thindex, type) => {
                    let item = this.columns.find( (item) => {
                        return item.key == this.columnsRow[trindex][thindex].key
                    })
                    if(item._sortType == type){
                        return 'on'
                    }else{
                        return ""
                    }
                }
            },
            headRows () {
                const isGroup = this.columnsRow.length > 1;
                if (isGroup) {
                    return this.fixed ? this.fixedColumnRows : this.columnsRow;
                } else {
                    return [this.columns];
                }
            },
            isAllSelect() {
                let isSelectAll = true
                if (!this.data.length) isSelectAll = false
                if (!this.data.find(item => !item._disabled)) isSelectAll = false
                for (let i = 0; i < this.data.length; i++) {
                    if (!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled) {
                        isSelectAll = false
                        break
                    }
                }
                return isSelectAll
            }
		}	
    }
</script>