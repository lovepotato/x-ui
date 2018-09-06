<template>
    <div :class="[prefixCls + '-page-container']">
        <div :class="[prefixCls + '-pagebox']">
            <i @click="goPage(currentPage-1)" :class="['gf-icon', 'icon-ios-arrow-back', prefixCls + '-goIcon', currentPage < 2 ? prefixCls + '-disable' : '']"></i>
            <a @click="goPage(firstNum)" :class="currentClass(firstNum)" href="javascript:;">{{firstNum}}</a>
            <span v-if="showPointsFront">...</span>
            <a @click="goPage(secondNum)" :class="currentClass(secondNum)" v-if="totalPage > 1" href="javascript:;">{{secondNum}}</a>
            <a @click="goPage(secondNum+1)" :class="currentClass(secondNum + 1)" v-if="totalPage > 2" href="javascript:;">{{secondNum + 1}}</a>
            <a @click="goPage(secondNum+2)" :class="currentClass(secondNum + 2)" v-if="totalPage > 3" href="javascript:;">{{secondNum + 2}}</a>
            <span v-if="showPointsEnd">...</span>
            <a @click="goPage(lastNum)" :class="currentClass(lastNum)" v-if="totalPage >= showNumber" href="javascript:;">{{lastNum}}</a>
            <i @click="goPage(currentPage+1)" :class="['gf-icon', 'icon-ios-arrow-forward', prefixCls + '-goIcon', currentPage == totalPage ? prefixCls + '-disable' : '']"></i>
            <span :class="[prefixCls + '-pageSkip']">
                到第
                <input type="text" min="1" v-model="skipPage" :class="[prefixCls + 'input']">
                页
                <button @click="jumpPage" type="button" :class="[prefixCls + 'button']">确定</button>
            </span>
            <span v-if="!isServerPage" :class="[prefixCls + '-count']">共 {{totalItem}} 条</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gf-table-page',
        props: {
            prefixCls: String,
            pageSize: {
                type: [Number, String],
                default() {
                    return 10
                }
            },
            currentPage: {
                type: [Number, String],
                default() {
                    return 1
                }
            },
            totalPage: {
                type: [Number, String],
                default() {
                    return 0
                }
            },
            totalItem: {
                type: [Number, String],
            },
            //是否为远程分页
            isServerPage: {
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                showNumber: 5,
                skipPage: "",
            }
        },
        computed: {
            firstNum() {
                return 1
            },
            lastNum() {
                return this.totalPage
            },
            secondNum() {
                const showPointsFront = this.showPointsFront
                const showPointsEnd = this.showPointsEnd
                if((showPointsFront && !showPointsEnd)){
                    return this.totalPage - 3
                }else if((showPointsEnd && !showPointsFront) || (!showPointsFront && !showPointsEnd)){
                    return 2
                }else if(showPointsFront && showPointsEnd){
                    return this.currentPage - 1
                }
            },
            //是否显示后面省略号
            showPointsEnd() {
                const showNumber = this.showNumber
                if(this.totalPage > showNumber){
                    if(this.currentPage <= this.totalPage - 3){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            },
            //是否显示前面省略号
            showPointsFront() {
                const showNumber = this.showNumber
                if(this.totalPage > showNumber){
                    if(this.currentPage >= 4){
                        return true
                    }else return false
                }else{
                    return false
                }
            },
            currentClass(num) {
                return (num) => {
                    if(num === this.currentPage){
                        return `${this.prefixCls}-pageNum ${this.prefixCls}-currentPage`
                    }else{
                        return `${this.prefixCls}-pageNum ${this.prefixCls}-commonPage`
                    }
                }  
            }
        },
        methods:{
            goPage(num){
                this.$emit('onChangePage',this.currentPage, num, this.pageSize)
            },
            jumpPage() {
                if(this.skipPage > 0){
                    this.$emit('onChangePage',this.currentPage, parseInt(this.skipPage), this.pageSize)
                }
                this.skipPage = ""
            }
        },
    }
</script>