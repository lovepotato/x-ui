<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styleObject" @keyup.enter="enableEdit = false">
        <colgroup>
            <col v-for="(column, index) in columns" :width="setCellWidth(column, index, false)">
        </colgroup>
        <template v-if="!draggable">
            <draggable :element="'tbody'" v-model="cloneData" :class="[prefixCls + '-tbody']" :options="options" @start="draggableStart" @end="draggableEnd">                     
                <template v-for="(row, index) in cloneData">
                    <tr @mouseenter.stop="handleMouseIn(row._index)"
                        @mouseleave.stop="handleMouseOut(row._index)"
                        :class="rowClasses(row._index)"
                        @click="clickCurrentRow(row._index)"
                        @dblclick.stop="dblclickCurrentRow(row._index)">
                        <td v-for="column in columns" :class="alignCls(column, row)" >
                            <Cell
                                :fixed="fixed"
                                :prefix-cls="prefixCls"
                                :row="row"
                                :key="column._columnKey"
                                :column="column"
                                :natural-index="index"
                                :index="row._index"
                                :enableEdit="enableEdit"
                                :checked="rowChecked(row._index)"
                                :disabled="rowDisabled(row._index)"
                                :expanded="rowExpanded(row._index)">
                            </Cell>
                        </td>
                    </tr>
                    
                    <template v-if="rowExpanded(row._index) && !draggable">
                        <transition name="fade">
                            <tr :class="{[prefixCls + '-expanded-hidden']: fixed}">
                                <td :colspan="columns.length" :class="prefixCls + '-expanded-cell'">
                                    <Expand :key="row._rowKey" :row="row" :render="expandRender" :index="row._index"></Expand>
                                </td>
                            </tr>    
                        </transition>
                    </template>
                </template>
            </draggable>
        </template>
        <template v-else>
            <draggable ref="dragbody" :element="'tbody'" v-model="cloneData" :class="[prefixCls + '-tbody']" :options="options" @start="draggableStart" @end="draggableEnd">                     
                <template v-for="(row, index) in cloneData">
                    <tr @mouseenter.stop="handleMouseIn(row._index)"
                        @mouseleave.stop="handleMouseOut(row._index)"
                        :class="rowClasses(row._index)"
                        @click="clickCurrentRow(row._index)"
                        @dblclick.stop="dblclickCurrentRow(row._index)">
                        <td v-for="column in columns" :class="alignCls(column, row)" >
                            <Cell
                                :fixed="fixed"
                                :prefix-cls="prefixCls"
                                :row="row"
                                :key="column._columnKey"
                                :column="column"
                                :natural-index="index"
                                :index="row._index"
                                :enableEdit="enableEdit"
                                :checked="rowChecked(row._index)"
                                :disabled="rowDisabled(row._index)"
                                :expanded="rowExpanded(row._index)">
                            </Cell>
                        </td>
                    </tr>
                </template>
            </draggable>
        </template>                  
    </table>
</template>

<script>
    import mixin from './mixin'
    import Cell from './cell.vue'
    import Expand from './cellRender'
    import draggable from 'vuedraggable'
    import {deepCopy} from '../utils'

    export default {
        name: 'gf-table-body',
        mixins: [ mixin ],
        components:{Cell, Expand, draggable},
        props: {
            prefixCls: String,
            styleObject: Object,
            columns: Array,
            data: Array,    // rebuildData
            objData: Object,
            columnsWidth: Object,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            draggable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                enableEdit: true,
                enableDrag: true,
                cloneData: deepCopy(this.data),
                fallbackOnBody: true
            }
        },
        computed: {
            expandRender () {
                let render = function () {
                    return '';
                };
                for (let i = 0; i < this.columns.length; i++) {
                    const column = this.columns[i];
                    if (column.type && column.type === 'expand') {
                        if (column.render) render = column.render;
                    }
                }
                return render;
            },
            options() {
                return{
                    animation: 100,
                    sort: true,
                    disabled: !this.draggable && this.enableDrag,
                    chosenClass: this.prefixCls + "-drag-tr",
                }
            },    
        },
        methods: {
            rowChecked (_index) {
                return this.objData[_index] && this.objData[_index]._isChecked;
            },
            rowDisabled(_index){
                return this.objData[_index] && this.objData[_index]._isDisabled;
            },
            rowExpanded(_index){
                return this.objData[_index] && this.objData[_index]._isExpanded;
            },
            handleMouseIn (_index) {
                this.$parent.handleMouseIn(_index);
                // console.log(_index)
            },
            handleMouseOut (_index) {
                this.$parent.handleMouseOut(_index);
            },
            rowClasses (_index) {
                return [
                    `${this.prefixCls}-row`,
                    this.rowClsName(_index),
                    {
                        [`${this.prefixCls}-row-highlight`]: this.objData[_index] && this.objData[_index]._isHighlight,
                        [`${this.prefixCls}-row-hover`]: this.objData[_index] && this.objData[_index]._isHover
                    }
                ];
            },
            rowClsName (_index) {
                return this.$parent.rowClassName(this.objData[_index], _index);
            },
            rowExpanded(_index){
                return this.objData[_index] && this.objData[_index]._isExpanded;
            },
            tdClick(column, row) {
                if(column.type == "input"){
                    // row._isClicked = true
                }
                // console.log(column,row)
            },
            changeExpand(index) {
                this.objData[index]._isExpanded = !this.objData[index]._isExpanded
            },
            draggableEnd(evt){
                console.log(evt)
                // evt.item.classList.remove('gf-table-drag-tr')
                const newIndex = evt.newIndex
                const oldIndex = evt.oldIndex
                this.$parent.dragDisableHover = false
                this.$nextTick ( () => {
                    if(newIndex != oldIndex){
                        this.$emit('drag-change-data-sort', this.cloneData, newIndex, oldIndex, evt.item)
                    }
                })
            },
            draggableStart(evt) {
                // evt.item.classList.add('gf-table-drag-tr')
                this.$parent.clearHover()
                this.$parent.dragDisableHover = true
            },
            clickCurrentRow (_index) {
                this.$parent.clickCurrentRow(_index);
            },
            dblclickCurrentRow (_index) {
                this.$parent.dblclickCurrentRow(_index);
            }
        },
        watch: {
            enableEdit(val) {
                // console.log(val)
            },
            data(a,b) {
                this.cloneData = deepCopy(a)
            },
            draggable(n) {
                if(n){
                    this.$nextTick( () => {
                        this.$refs.dragbody.computeIndexes()             //取消v-if带来的注释节点对拖拽的影响
                    })   
                }
            }
        }
    }
</script>