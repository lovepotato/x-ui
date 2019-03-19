<template>
    <!-- <div id='app'>
        <ui-head></ui-head>
        <div class="container" ref="container">
            <side-nav class="nav"></side-nav>
            <router-view class="view"></router-view>
        </div>
        <mainFooter :footPosition='footPosition'></mainFooter>
    </div> -->
    <div id="app" style="width:1000px;"> -->
        <gf-table height="500" :columns="columns11" :data="data10" :page="page" :border="test" :row-class-name="rowClassName"
            @on-sort-change="sortTest" :loading="loading" @on-select="os" @on-select-cancel="osc" @on-selection-change="osch" @on-select-all="osa" :draggable="drag"
            @on-row-mousein="rowMouseIn"  @on-row-mouseout="rowMouseOut"></gf-table>
        <button @click="change">ceshi</button>
        <button @click="changeDrag">drag</button>
    </div>
    
</template>

<script>
    import gfTable from '../packages/table/table.vue'
    import uiHead from './components/Uihead.vue'
    import sideNav from './components/Nav.vue'
    import mainFooter from './components/footer.vue'
    import {getStyle, deepCopy, getScrollBarSize, on, off} from '../packages/utils'
    export default {
        name: 'App',
        components: { gfTable, uiHead, sideNav, mainFooter },
        created() {
            // this.http.get('http://192.168.1.51:3000/StudioApi/Log').then( (res) => {
            //     console.log(res)
            //     this.data1 = res.data.data
            // })
            this.http.get(`http://192.168.1.51:3000/StudioApi/Materials?PageSize=4&PageNumber=1&OrderBy=Name`).then((res) => {
                console.log(res)
                this.data1 = res.data.data
            })
            const data4 = []
            for (let i = 0; i < 100; i++){
                data4.push({
                    name: 'xmc',
                    age: i+1,
                    address: 'Lake Street 42'
                })
            }
            this.data4 = data4
            // for(let i = 0; i < 100; i++)
            // {
            //     this.data1.number = i
            // }

            const data = [];
            for (let i = 0; i < 20; i++) {
                data.push({
                    key: i,
                    name: 'John Brown',
                    age: i + 1,
                    street: 'Lake Park',
                    building: 'C',
                    door: 2035,
                    caddress: 'Lake Street 42',
                    cname: 'SoftLake Co',
                    gender: 'M',
                });
            }
            this.data10 = data;
        },
        mounted() {
            this.$nextTick( ()=> {
                this.height = window.innerHeight
                let _this = this
                on(window, 'resize', ()=>{
                    _this.height = window.innerHeight
                    let height = parseInt(getStyle(_this.$refs.container, 'height'))

                    if(_this.height - height < 80 * 2 + 96){
                        _this.footPosition = 'relative'
                    }else{
                        _this.footPosition = 'absolute'
                    }
                })
            })  
        },
        beforeDestroy() {
            off(window, 'resize', ()=>{
                this.height = window.innerHeight
            })
        },
        data() {
            return {
                columns8: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                page1: {
                    pageSize:5
                },
                data4: [],
                footPosition: 'absolute',
                height: 0,
                drag:false,
                loading:false,
                page: {
                    isServerPage: true,
                    pageSize: 4,
                    totalPage: 900,
                    pagingCB: (from, to, pageSize, sort) => {
                        console.log(sort)
                        this.http.get(`http://192.168.1.51:3000/StudioApi/Materials?PageSize=4&PageNumber=${to}&OrderBy=Name`).then((res) => {
                            // console.log(res)
                            this.data1 = res.data.data
                        })
                    }
                },
                data10: [],
                columns1: [
                    {
                        title: 'Name',
                        key: 'Name',
                        // sortable:true,
                    },
                    {
                        title: 'CreateTime',
                        key: 'CreateTime',
                        // className: 'test-col',
                        sortable: true,
                    },
                    {
                        title: 'Duration',
                        key: 'Duration',
                        sortable: true,
                        type: 'input',
                        onChangeData(row, key) {
                            console.log(row[key], key)
                            return true
                        }
                    },
                    {
                        title: "FileName",
                        key: 'FileName',
                        render: (h, params) => {
                            if(params.index == 1){
                                return h('strong',params.row.FileName)
                            }else{
                                let s = [1,2,3,4]
                                return h('select', s.map(function (item,index) {
                                        return h('option',item)
                                    }
                                ));
                            }
                        },
                    }
                ],
                columns2: [
                    {
                        title: 'CreatePosition',
                        key: 'CreatePosition',
                        sortable: true,
                    },
                    {
                        title: 'Content',
                        key: 'Content',
                        className: 'test-col'
                    },
                    {
                        title: 'CreateUser',
                        key: 'CreateUser'
                    }
                ],
                data1: [

                ],
                test: true,
                columns11: [
                    {
                        // title: 'index',
                        type: 'selection',
                        align: 'center',
                        width:100,
                        // fixed: 'left',
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        align: 'center',
                        width: 200,
                        // fixed: 'left',
                        filters: [
                            {
                                label: 'Joe',
                                value: 1
                            },
                            {
                                label: 'John',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.name === 'Joe';
                            } else if (value === 2) {
                                return row.name === 'John Brown';
                            }
                        }
                    },
                    {
                        type:'expand',
                        width:100,
                        render(h, params) {
                            return h('strong',['拓展区域'])
                        }
                    },
                    {
                        title: 'Other',
                        align: 'center',
                        renderHeader (h, params) {
                            return h('div',{
                                    style: {
                                        height: '100%',
                                        width: '100%',
                                        color: 'white',
                                        backgroundColor: '#7ca8ff'
                                    },                              
                                },
                                [h('strong', params.column.title)]
                            )
                        },
                        children: [
                            {
                                title: 'Age',
                                key: 'age',
                                align: 'center',
                                width: 200,
                                sortable: true
                            },
                            {
                                title: 'Address',
                                align: 'center',
                                children: [
                                    {
                                        title: 'Street',
                                        key: 'street',
                                        align: 'center',
                                        width: 200
                                    },
                                    {
                                        title: 'Block',
                                        align: 'center',
                                        renderHeader (h, params) {
                                            return h('div',{
                                                    style: {
                                                        height: '100%',
                                                        width: '100%',
                                                        // color: 'white',
                                                        backgroundColor: 'pink'
                                                    },                              
                                                },
                                                [h('strong', params.column.title)]
                                            )
                                        },
                                        children: [
                                            {
                                                title: 'Building',
                                                key: 'building',
                                                align: 'center',
                                                width: 200,
                                                sortable: true,
                                                type: 'input'
                                            },
                                            {
                                                title: 'Door No.',
                                                key: 'door',
                                                align: 'center',
                                                width: 200
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Company',
                        align: 'center',
                        children: [
                            {
                                title: 'Company Address',
                                key: 'caddress',
                                align: 'center',
                                width: 200
                            },
                            {
                                title: 'Company Name',
                                key: 'cname',
                                align: 'center',
                                width: 200
                            }
                        ]
                    },
                    {
                        title: 'Gender',
                        key: 'gender',
                        align: 'center',
                        width: 200,
                        // fixed: 'right'
                    }
                ],
                timeOutFunction: ''
            }
        },
        methods: {
            rowMouseIn() {
                // console.log(...arguments)
                this.timeOutFunction = setTimeout(() => {
                    arguments[0]._isExpanded = true
                }, 800)
            },

            rowMouseOut() {
                clearTimeout(this.timeOutFunction)
                // console.log(...arguments)
            },
            change() {
                this.test = !this.test;
                this.loading = !this.loading
            },
            rowClassName(row, index) {
                if (row.Content == "退出 网络管理") {
                    return 'class-out'
                }
            },
            sortTest({ column, key, order, currentPage, pageSize }) {
                console.log(column, key, order, currentPage, pageSize)
            },
            getOb(column) {
                let d1 = []
                for(let i in column)
                {
                    let item = column[i]
                    let {row, col} = this.getColumnDeep(item)
                    item.row = row
                    item.col = col
                    d1.push(item)
                    if(item.children && item.children instanceof Array){
                        
                    }
                }
            },
            changeDrag() {
                this.drag = !this.drag
            },
            os(a, b) {
                // console.log('on-select', a, b)
            },
            osc(a, b) {
                // console.log('on-select-cancel', a, b)
            },
            osch(a, b) {
                // console.log('on-select-change', a, b)
            },
            osa(a, b) {
                // console.log('on-select-all', a, b)
            },
            fixedFooter(){
                let height = parseInt(getStyle(this.$refs.container, 'height'))

                if(this.height - height < 80 * 2 + 96){
                    this.footPosition = 'relative'
                }else{
                    this.footPosition = 'absolute'
                }
            }
        },
        watch:{
            $route(to,from){
                this.$nextTick( ()=> {
                    this.fixedFooter()
                })
            }
        },
        // beforeRouteEnter (to, from, next) {
        //     console.log('beforeRouteEnter')
        // },
        // beforeRouteUpdate (to, from, next) {
        //     console.log('beforeRouteUpdate')
        // },
        // beforeRouteLeave (to, from, next) {
        //     console.log('beforeRouteLeave')
        // },
    }    
</script>

<style>
    .class-out td {
        background-color: rgb(241, 201, 229);
    }

    td.test-col {
        background-color: rgb(139, 179, 255);
    }
</style>

<style lang="less" type="text/less">
    @import "./assets/md";
  
    .container {
      margin: 48px auto;
      width: 90%;
      background-color: #fff;
      box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
      .nav {
        float: left;
        width: 210px;
      }
      .view {
        float: left;
        width: calc(~'100% - 215px');
        padding: 32px 48px 48px;
        box-sizing: border-box;
      }
    }
  
    .container:after {
      content: "";
      clear: both;
      display: block;
    }
    
  </style>