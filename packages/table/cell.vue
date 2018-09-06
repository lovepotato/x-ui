<template>
    <div :class="classes" ref="cell" @click="clickCell(row, column)">
        <template v-if="renderType === 'index'">{{naturalIndex + 1}}</template>
        <template v-else-if="renderType === 'expand' && !row._disableExpand">
            <div :class="[prefixCls + '-cell-expand' ,{[prefixCls + '-cell-expand-expanded'] : isExpand}]" @click="emitExpand">
                <i class="gf-icon icon-ios-arrow-forward"></i>
            </div>
        </template>
        <template v-else-if="renderType === 'input'">
            <input v-if="enableEditing" v-focus type="text" v-model="row[column.key]" @blur="changeEditState" :class="[prefixCls + '-input']">
            <span v-else>{{row[column.key]}}</span>
        </template>
        <template v-else-if="renderType === 'selection'">
            <input type="checkbox" v-model="isSelect" @click.stop.prevent="singleSelect" :disabled="disabled">
        </template>
        <template v-else-if="renderType === 'render'">
            <render-cell
                :row=row
                :column=column
                :index="index"
                :render="column.render"
            ></render-cell>
        </template>
        <template v-else><span>{{row[column.key]}}</span></template>
    </div>
</template>
<script>
    import renderCell from './cellRender'
    export default {
        name: 'gf-table-cell',
        components:{renderCell},
        props: {
            prefixCls: String,
            row: Object,
            column: Object,
            naturalIndex: Number,    // index of rebuildData
            index: Number,           // _index of data
            checked: Boolean,
            disabled: Boolean,
            expanded: Boolean,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            enableEdit:{           //编辑状态  
                type: Boolean
            }     
        },
        data () {
            return {
                renderType: '',
                isEditing: false,
                prevData: this.row[this.column.key],
                isExpand:false,
            }
        },
        watch: {
            // row: {
            //     // handler(newVal,oldVal) {
            //     //     console.log(11)
            //     // },
            //     deep:true
            // }
        },
        computed: {
            classes () {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
                        [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis || false,
                        [`${this.prefixCls}-cell-with-expand`]: this.renderType === 'expand',
                        [`${this.prefixCls}-editing`]: (this.renderType === 'input' && this.enableEditing)
                    }
                ];
            },
            enableEditing() {
                if(this.isEditing && this.enableEdit){
                    return true
                }else{
                    return false
                }
            },
            isChecked(index) {
                return (index) => [
                    {
                        [`checked`]: this.$parent.$parent.objData[index]._isChecked
                    }
                ]
            },
            isSelect() {
                return this.$parent.$parent.objData[this.index]._isChecked
            } 
        },
        methods: {
            clickCell(row, column) {
                if(this.renderType == 'input'){
                    this.$parent.$parent.enableEdit = true
                    this.isEditing = true   
                }
            },
            changeEditState() {
                this.isEditing = false
                this.$parent.$parent.enableEdit = false

                //与上一次数据比较，有改动则触发用户自定义的数据改变事件
                if(this.prevData !== this.row[this.column.key]){
                    if(this.column.onChangeData && typeof this.column.onChangeData == "function"){
                        if(!this.column.onChangeData(this.row, this.column.key)){
                            this.row[this.column.key] = this.prevData    //如果返回false，则恢复原来数据
                        }else{
                            this.prevData = this.row[this.column.key]
                        }
                    }
                }
            },
            emitExpand() {
                if(this.$parent.$parent.objData[this.index]._isExpanded){
                    this.isExpand = false
                }else{
                    this.isExpand = true
                }
                // this.$emit('changeExpand',this.index)
                this.$parent.$parent.$parent.toggleExpand(this.index)
            },
            singleSelect() {
                this.$parent.$parent.$parent.toggleSelect(this.index)
            }
        },
        created () {
            if (this.column.type === 'index') {
                this.renderType = 'index';
            } else if (this.column.type === 'selection') {
                this.renderType = 'selection';
            } else if (this.column.type === 'html') {
                this.renderType = 'html';
            } else if (this.column.type === 'expand') {
                this.renderType = 'expand';
            } else if (this.column.type === 'input') {
                this.renderType = 'input';
            } else if (this.column.render) {
                this.renderType = 'render';
            } else {
                this.renderType = 'normal';
            }
        },
        directives: {
            focus: {
                // 指令的定义
                inserted: function (el) {
                    el.focus()
                }
            }
        }
    }
</script>