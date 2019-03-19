# Table 表格

---

### 基础用法

传入```columns```和```data```来新建表格。
#### 代码示例：
<div class="demo-block">
    <gf-table :columns="columns1" :data="data1"></gf-table>
</div>

:::demo
```html
<template>
    <gf-table :columns="columns1" :data="data1"></gf-table>
</template>
<script>
    export default {
        data() {
            return {
                columns1: [
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
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            };
        }
    }
</script>
```
:::

---

### 隔行变色和边框

  传入`stripe`控制隔行变色，传入`border`控制表格边框

#### 代码示例:

<div class="demo-block">
    <gf-table :columns="columns1" :data="data1" stripe border></gf-table>
</div>

:::demo
```html
<template>
    <gf-table :columns="columns1" :data="data1" stripe border></gf-table> 
</template>
```
:::

---

### 在表格中设置不同的样式

#### 自定义行样式：
表格接受一个函数`row-class-name`，参数为 **当前行数据** 和 **当前行索引** ，返回结果为 **样式名称**

<div class="demo-block">
    <gf-table :row-class-name="rowClassName" :columns="columns1" :data="data1"></gf-table>
</div>

#### 自定义列样式：
要定义自定义列样式，要在列columns对象的某列里加上`className`字段，属性值即为 **样式名称**

<div class="demo-block">
    <gf-table :columns="columns9" :data="data1"></gf-table>
</div>    

#### 自定义单元格样式：
通过给数据 data 设置字段 `cellClassName` 可以给任意一个单元格指定样式

<div class="demo-block">
    <gf-table :columns="columns1" :data="data8"></gf-table>
</div>  

#### 代码示例：

:::demo

```html
<style>
    .gf-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .gf-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .gf-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .gf-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .gf-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .gf-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>
<template>
    <p>自定义行样式：</p>
    <gf-table :row-class-name="rowClassName" :columns="columns1" :data="data1"></gf-table>
    <p>自定义列样式:</p>
    <gf-table :columns="columns9" :data="data1"></gf-table>
    <p>自定义单元格样式:</p>
    <gf-table :columns="columns1" :data="data8"></gf-table>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
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
                columns9: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        className: 'demo-table-info-column'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                data8: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        cellClassName: {
                            age: 'demo-table-info-cell-age',
                            address: 'demo-table-info-cell-address'
                        }
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        cellClassName: {
                            name: 'demo-table-info-cell-name'
                        }
                    }
                ]
            }
        },
        methods: {
            rowClassName (row, index) {
                if (index === 1) {
                    return 'demo-table-info-row';
                } else if (index === 3) {
                    return 'demo-table-error-row';
                }
                return '';
            }
        }
    }
</script>

```
:::

---
### 固定表头

通过设置属性 `height` 给表格指定高度后，会自动固定表头。当纵向内容过多时可以使用。
#### 代码示例：

<div class="demo-block">
    <gf-table height="200" :columns="columns1" :data="data2"></gf-table>
</div>

:::demo
```html
<template>
    <gf-table height="200" :columns="columns1" :data="data2"></gf-table>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
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
                data2: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        }
    }
</script>
```
:::

---
### 固定列

通过给数据 `columns` 的项设置 `fixed` 为 `left` 或 `right`，可以左右固定需要的列。当横向内容过多时可以使用。
#### 代码示例：

<div class="demo-block">
    <gf-table width="550" border :columns="columns2" :data="data3"></gf-table>
</div>

:::demo 
```html

<template>
    <gf-table width="550" border :columns="columns2" :data="data3"></gf-table>
</template>
<script>
    export default {
        data () {
            return {
                columns2: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width: 100
                    },
                    {
                        title: 'Province',
                        key: 'province',
                        width: 100
                    },
                    {
                        title: 'City',
                        key: 'city',
                        width: 100
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width: 200
                    },
                    {
                        title: 'Postcode',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'View'),
                                h('button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
                ],
                data3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        province: 'America',
                        city: 'New York',
                        zip: 100000
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'Washington, D.C. No. 1 Lake Park',
                        province: 'America',
                        city: 'Washington, D.C.',
                        zip: 100000
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        province: 'Australian',
                        city: 'Sydney',
                        zip: 100000
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        province: 'Canada',
                        city: 'Ottawa',
                        zip: 100000
                    }
                ]
            }
        }
    }
</script>
```
:::

---

### 行内输入框编辑
通过给 `columns` 数据的项，设置 `type: input`，同时设置一个回调函数 `onChangeData` ,点击该列的所有单元格即可开启编辑

回调函数 `onChangeData` 接受两个参数：
- `row` ：当前行数据
- `column` ： 当前列数据的key

该回调函数只有在返回 `true` 时才会改变表格当前数据，返回 `false` 则不会改变数据。如果需要更加复杂的功能，可以使用 `render` 选项。

*注意*，修改单元格数据并不会改变源数据 `data`，但是通过API获取数据会获取到改变后的 `data` 

#### 代码示例：

<div class="demo-block">
    <gf-table :columns="columns3" border :data="data1"></gf-table>
</div>

:::demo
```html

<template>
    <gf-table :columns="columns3" :data="data1"></gf-table>
</template>
<script>
    export default {
        data() {
            return {
                columns3: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        type: 'input',
                        onChangeData: (row, key) => {                //最好使用箭头函数，使得this指向当前vue实例，以改变data的值
                            console.log(row, key)
                            return true
                        }
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            };
        }
    }
</script>

```
:::


---
### 排序

通过给 `columns` 数据的项，设置 `sortable: true`，即可对该列数据进行排序，排序默认使用升序和降序


如果使用远程排序，需要触发排序事件 `@on-sort-change`后，进行远程排序，并手动设置新的 data，详见 API。


*注意*，排序并不会影响到源数据 data。

#### 代码示例：

<div class="demo-block">
    <gf-table border :columns="columns6" :data="data6"></gf-table>
</div>

:::demo
```html

<template>
    <gf-table border :columns="columns6" :data="data6"></gf-table>
</template>
<script>
    export default {
        data () {
            return {
                columns6: [
                    {
                        title: 'Date',
                        key: 'date',
                        sortable: true
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        }
    }
</script>

```
:::

---

### 分页

表格接受一个分页对象 `page` ，对象有一个必要字段 `pageSize` 来设置分页一页的数量，之后会根据 `data` 长度自动分页

#### 代码示例：

<div class="demo-block">
    <gf-table :page="page1" :columns="columns1" :data="data4" border></gf-table>
</div>

:::demo
```html

<template>
    <gf-table :page="page1" :columns="columns1" border :data="data4"></gf-table>
</template>
<script>
    export default {
        data() {
            return {
                columns1: [
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
                data4: [],
                page1: {
                    pageSize: 5
                }
            }    
            mounted () {
                const data4 = []
                for (let i = 0; i < 100; i++){
                    data4.push({
                        name: 'xmc',
                        age: i+1,
                        address: 'Lake Street 42'
                    })
                }
                this.data4 = data4
            }
        }
    }
</script>

```
:::

---

### 远程分页

当需要远程分页时，需要给 `page` 项设置字段 `isServerPage` 为 `true`，此时 `page` 接受三个必要字段
- `pageSize`: 单页数量大小
- `totalPage`: 总页数
- `pagingCB`: 点击的回调函数，参数为 **上一页(int)** 、**下一页(int)** 、**pageSize(int)** 、 **当前排序规则(Object)**

*注意*：远程分页时，设置的 `pageSize` 必须要大于等于 `data` 的长度
#### 代码示例：

<div class="demo-block">
    <gf-table :page="page2" :columns="columns1" :data="data5" border></gf-table>
</div>

:::demo
```html

<template>
    <gf-table :page="page2" :columns="columns1" border :data="data5"></gf-table>
</template>
<script>
    export default {
        data() {
            return {
                columns1: [
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
                data5: [],
                page1: {
                    pageSize:5,
                    isServerPage: true,
                    totalPage: 10,
                    pagingCB: (from, to, pageSize, currentSort) => {     //最好使用箭头函数，使得this指向当前vue实例，以改变data的值
                        const data = []
                        for (let i = 0; i < 5; i++){
                            data.push({
                                name: 'xmc',
                                age: 23,
                                address: `第${to}页的数据`
                            })
                        }
                        this.data5 = data
                    }
                }
            }    
            mounted () {
                const data5 = []
                for (let i = 0; i < 5; i++){
                    data5.push({
                        name: 'xmc',
                        age: 23,
                        address: '第1页的数据'
                    })
                }
                this.data5 = data5
            }
        }
    }
</script>

```
:::

---

### 多级表头

给列 `column` 设置 `children`，可以渲染出分组表头。

#### 代码示例：

<div class="demo-block">
    <gf-table :columns="columns11" :data="data10" border height="500"></gf-table>
</div>

:::demo
```html

<template>
    <gf-table :columns="columns11" :data="data10" border height="500"></gf-table>
</template>
<script>
    export default {
        data () {
            return {
                columns11: [
                    {
                        title: 'Name',
                        key: 'name',
                        align: 'center',
                        width: 200,
                        fixed: 'left',
                    },
                    {
                        title: 'Other',
                        align: 'center',
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
                                        children: [
                                            {
                                                title: 'Building',
                                                key: 'building',
                                                align: 'center',
                                                width: 200,
                                                sortable: true
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
                        fixed: 'right'
                    }
                ],
                data10: []
            }
        },
        mounted () {
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
        }
    }
</script>

```
:::

---

### 显示索引

对列`columns` 对象设置一个单独的对象，指定`type: index`，则该列为索引列
#### 代码示例：
<div class="demo-block">
    <template>
        <gf-table :columns="columns12" border :data="data1"></gf-table>
    </template>
</div>

:::demo 
```html

<template>
    <gf-table :columns="columns12" border :data="data1"></gf-table>
</template>
<script>
    export default {
        data() {
            return {
                columns12: [
                    {
                        type: 'index',
                    },
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
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            };
        }
    }
</script>

```
:::

---

### 多选

对列`columns` 对象设置一个单独的对象，指定`type: selection`，则该列为多选列，表格开启多选功能

给 data 项设置特殊 key `_checked: true` 可以默认选中当前项。

给 data 项设置特殊 key `_disabled: true` 可以禁止选择当前项。

正确使用好以下事件，可以达到需要的效果：

- `@on-select`，选中某一项触发，返回值为 **selection** 和 **row**，分别为已选项和刚选择的项。
- `@on-select-all`，点击全选时触发，返回值为 **selection**，**已选项**。
- `@on-selection-change`，只要选中项发生变化时就会触发，返回值为 **selection**，**已选项**。

#### 示例代码：

<div class="demo-block">
    <gf-table ref="table" :columns="columns13" :data="data12" border style="margin-bottom:10px"></gf-table>
    <button @click="selectTableAll(true)">选中全部</button>
    <button @click="singleSelect(3)">选中第三行</button>
    <button @click="selectTableAll(false)">全部取消选中</button>
</div>


:::demo
```html

<template>
    <gf-table ref="table" :columns="columns13" :data="data12" border style="margin-bottom:10px"></gf-table>
    <button @click="selectTableAll(true)">选中全部</button>
    <button @click="singleSelect(3)">选中第三行</button>
    <button @click="selectTableAll(false)">全部取消选中</button>
</template>
<script>
    export default {
        data() {
            return {
                columns13: [
                    {
                        type: 'selection',
                        align: 'center',
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        align: 'center',
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        align: 'center',
                    }
                ],
                data12: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01',
                        _checked: true
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04',
                        _disabled: true
                    }
                ],
            };
        },
        methods: {
            selectTableAll (status) {
                this.$refs.table.selectAll(status)
            },
            singleSelect(index) {
                this.$refs.table.toggleSelect(index - 1)
            }
        }
    }
</script>

```
:::

---

### 自定义列模板

通过给 `columns` 数据的项，设置一个函数 `render`，可以自定义渲染当前列，包括渲染自定义组件，它基于 `Vue` 的 `Render` 函数。

`render` 函数传入两个参数，第一个是 `h`，第二个是对象，包含 `row、column 和 index`，分别指当前单元格数据，当前列数据，当前是第几行。

[学习 Render函数](https://cn.vuejs.org/v2/guide/render-function.html)
#### 代码示例：

<div class="demo-block"> 
    <gf-table border :columns="columns7" :data="data6"></gf-table>
</div>   

:::demo
```html
<template>
    <gf-table border :columns="columns7" :data="data6"></gf-table>
</template>
<script>
    //本例可以观察html是否改变
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('button', {
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                alert(`content: Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`)
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>

```
:::

---

### 可展开
当表格内容较多不能一次性完全展示时使用。

通过给 `columns` 数据设置一项，指定 `type: 'expand'`，即可开启扩展功能。

给行数据 `data` 的某项设置 `_expanded 为 true`，可以默认展开当前行，设置 `_disableExpand` 可以禁用当前行的展开功能。

渲染展开区域与自定义列模板方法类似，使用 `render` 函数。当内容较复杂时，可拆分为组件或使用 `JSX`。

[学习 Render函数](https://cn.vuejs.org/v2/guide/render-function.html)
#### 代码示例：

<div class="demo-block">
    <gf-table :columns="columns10" :data="data1"></gf-table>
</div>

:::demo
```html

<template>
    <gf-table :columns="columns10" :data="data1"></gf-table>
</template>
<script>
    export default {
        data() {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h('strong',['拓展区域'])
                        }
                    },
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
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01',
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
            };
        },
    }
</script>

```
:::

---

### 行拖拽

设置属性 `draggable` ，则行与行直接可拖拽变化位置，方便手动排序。

*注意*：拖拽不会改变源数据内部的位置，但是通过API会获取到已拖拽的数据。

#### 代码示例

<div class="demo-block">
    <gf-table :columns="columns1" :data="data1" draggable></gf-table>
</div>

:::demo
```html

<template>
    <gf-table :columns="columns1" :data="data1" draggable></gf-table>
</template>
<script>
    export default {
        data() {
            return {
                columns1: [
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
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01',
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
            };
        },
    }
</script>

```
:::

---

### 加载中

通过设置属性 `loading` 可以让表格处于加载中状态，在异步请求数据、分页时建议使用。

#### 代码示例：

<div class="demo-block">
    <gf-table :columns="columns1" :data="data1" :loading="loading" style="margin-bottom:10px"></gf-table>
    <button @click="changeLoading" style="margin-right:15px">改变loading状态</button>
    <span>loading状态：{{loading}}<span>
</div>

:::demo
```html

<template>
    <gf-table :columns="columns1" :data="data1" :loading="loading" style="margin-bottom:10px"></gf-table>
    <button @click="changeLoading" style="margin-right:15px">改变loading状态</button>
    <span>loading状态：{{loading}}<span>
</template>
<script>
    export default {
        data() {
            return {
                loading: true,
                columns1: [
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
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01',
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
            };
        },
        methods: {
            changeLoading() {
                this.loading = !this.loading
            }
        }
    }
</script>

```
:::


--------
--------  
</br>
</br>

### API

#### Table props

| 参数      | 说明    | 类型     | 默认值   |
|---------- |-------- |---------- |-------- |
| data       | 显示的结构化数据 | Array | [ ] |
| columns    | 表格列的配置描述，具体详见后文| Array | [ ] |
| stripe     | 是否显示间隔斑马纹 | Boolean | false |
| border     | 是否显示纵向边框 | Boolean | false |
| height     | 表格高度，单位 px，设置后会固定表头 |  Number or String | - |
| width      | 表格宽度，单位 px | Number or String | 自动 |
| page       | 分页设置， 具体详见后文 | Object | { } |
| disabled-hover | 禁止表格Hover状态 | Boolean | false |
| rowClassName | 设置行样式的回调函数，传入参数: row：当前行数据 index：当前行的索引， 可返回当前行的样式 | Function | - |
| loading    | 设置表格是否在加载中状态 | Boolean | false |
| draggable  | 设置表格是否可拖动 | Boolean | false |

</br>

#### Table events 

| 事件名      |  说明  |      返回值       |
|-------------|--------|------------------|
| on-select   | 在多选模式下有效，选中某一项时触发 | selection：已选项数据； row：刚选择的项数据 |
| on-select-cancel | 在多选模式下有效，取消选中某一项时触发 | selection：已选项数据；row：取消选择的项数据 |
| on-select-all    | 在多选模式下有效，点击全选时触发 | selection：已选项数据 |
| on-selection-change | 在多选模式下有效，只要选中项发生变化时就会触发 | selection：已选项数据 |
| on-sort-change | 排序时有效，当点击排序时触发 | column：当前列数据；key：排序依据的指标；order：排序的顺序，值为 asc 或 desc；currentPage：有分页时当前所在页；pageSize：有分页时，一页显示数量 |
| on-row-click     | 单击某一行时触发 | row:当前行的数据；index：当前行索引 |
| on-row-dblclick  | 双击某一行时触发 | row:当前行的数据；index：当前行索引 |
| on-expand        | 展开或收起某一行时触发 | row：当前行的数据；status：当前的状态 |
| on-drag-end      | 拖拽一行结束后触发 | newIndex：拖拽行前的索引；oldIndex：拖拽行后的索引，item：当前拖拽的元素(dom元素) |
| on-row-mousein   | 鼠标进入某一行时触发 | row:当前行的数据；index：当前行索引 |
| on-row-mouseout   | 鼠标离开某一行时触发 | row:当前行的数据；index：当前行索引 |

</br>

#### Table slot 

| 名称 | 说明 |
|------|------|
| nodata | 暂无数据时的显示 |

</br>

#### Table methods 

| 方法名 |           说明              | 参数    | 返回值 |
|--------|-----------------------------|--------|--------|
| getSelection | 多选模式下、获取当前选中的数据 | - | 选中数据(Array) |
| selectAll | 多选模式下、全选或者全不选 | Boolean：传入True则全选 | - |
| toggleSelect | 多选模式下，单独选中一个 | index：选中数据的索引 | - |
| getTableData | 获取当前表格数据(排序过后) | - | 当前表格数据(Array) |

</br>

#### column 

列描述数据对象，是 columns 中的一项

| 参数      | 说明    | 类型     | 默认值   |
|---------- |-------- |---------- |-------- |
| type      | 列类型，可选值为 index、selection、expand、input | String | - |
| title     | 列头显示文字 | String | - |
| key       | 对应列内容的字段名 | String | - |
| width     | 该列宽度（注意：如果每列都设置宽度，那设置的总宽度不能小于外部容器宽度）| Number | 自动 |
| align     | 对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐 | String | left |
| className | 列的样式名称 | String | - |
| fixed     | 列是否固定在左侧或者右侧，可选值为 left 左侧和 right 右侧 | String | - |
| render    | 自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。| Funtion | - |
| renderHeader | 自定义列头显示内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 column 和 index，分别为当前列数据和当前列索引。| Function | - |
| sortable | 对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序，需要监听 Table 的 on-sort-change 事件 | Boolean | false |
| sortType | 设置初始化排序。值为 asc 和 desc | String | - |
| children | 表头分组,详见示例 | Array | - |
| onChangeData | 开启单元格编辑后，数据改变后的回调函数，详见示例 | Funtion | - | 

</br>

#### page

分页描述数据对象

| 参数      | 说明    | 类型     | 默认值   |
|-----------|---------|----------|---------|
| pageSize  | 设置每页显示数据数量 | Number | 无，必须填写 |
| isServerPage | 开启远程分页 | Boolean | false |
| totalPage | 总页数，当开启远程分页时，必须填写 | Number | - |
| pagingCB  | 切换页数的回调函数，详见示例 | Function | - |
| currentPage | 当前显示页数 | Number | - |

</br>

---
<script>
    export default {
        data() {
            return {
                loading: true,
                columns1: [
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
                columns12: [
                    {
                        type: 'index',
                        align: 'center',
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        align: 'center',
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        align: 'center',
                    }
                ],
                columns13: [
                    {
                        type: 'selection',
                        align: 'center',
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        align: 'center',
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        align: 'center',
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01',
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                data12: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01',
                        _checked: true
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04',
                        _disabled: true
                    }
                ],
                columns9: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        className: 'demo-table-info-column'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data8: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        cellClassName: {
                            age: 'demo-table-info-cell-age',
                            address: 'demo-table-info-cell-address'
                        }
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        cellClassName: {
                            name: 'demo-table-info-cell-name'
                        }
                    }
                ],
                data2: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                columns2: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width: 100
                    },
                    {
                        title: 'Province',
                        key: 'province',
                        width: 100
                    },
                    {
                        title: 'City',
                        key: 'city',
                        width: 100
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width: 200
                    },
                    {
                        title: 'Postcode',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('button', {
                                    attrs: {
                                        type:"button"
                                    }
                                }, 'View'),
                                h('button', {
                                    attrs: {
                                        type:"button"
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
                ],
                columns3: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        type: 'input',
                        onChangeData: (row, key) => {                //最好使用箭头函数，使得this指向当前vue实例，以改变data的值
                            console.log(row, key)
                            return true
                        }
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        province: 'America',
                        city: 'New York',
                        zip: 100000
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'Washington, D.C. No. 1 Lake Park',
                        province: 'America',
                        city: 'Washington, D.C.',
                        zip: 100000
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        province: 'Australian',
                        city: 'Sydney',
                        zip: 100000
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        province: 'Canada',
                        city: 'Ottawa',
                        zip: 100000
                    }
                ],
                columns11: [
                    {
                        title: 'Name',
                        key: 'name',
                        align: 'center',
                        width: 200,
                        fixed: 'left',
                    },
                    {
                        title: 'Other',
                        align: 'center',
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
                                        children: [
                                            {
                                                title: 'Building',
                                                key: 'building',
                                                align: 'center',
                                                width: 200,
                                                sortable: true
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
                        fixed: 'right'
                    }
                ],
                data10: [],
                page1: {
                    pageSize:5
                },
                data4: [],
                data5: [],
                page2: {
                    pageSize:5,
                    isServerPage: true,
                    totalPage: 10,
                    pagingCB: (from, to, pageSize, currentSort) => {
                        const data = []
                        for (let i = 0; i < 5; i++){
                            data.push({
                                name: 'xmc',
                                age: 23,
                                address: `第${to}页的数据`
                            })
                        }
                        this.data5 = data
                    }
                },
                columns6: [
                    {
                        title: 'Date',
                        key: 'date',
                        sortable: true
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                columns7: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('button', {
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h('strong',['拓展区域'])
                        }
                    },
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
            }
        },
        methods: {
            rowClassName (row, index) {
                if (index === 1) {
                    return 'demo-table-info-row';
                } else if (index === 3) {
                    return 'demo-table-error-row';
                }
                return '';
            },
            selectTableAll (status) {
                this.$refs.table.selectAll(status)
            },
            singleSelect(index) {
                this.$refs.table.toggleSelect(index - 1)
            },
            show (index) {
                alert(`content: Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`)
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            changeLoading() {
                this.loading = !this.loading
            }
        },
        mounted () {
            const data10 = [];
            for (let i = 0; i < 20; i++) {
                data10.push({
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
            this.data10 = data10;

            const data4 = []
            for (let i = 0; i < 100; i++){
                data4.push({
                    name: 'xmc',
                    age: i+1,
                    address: 'Lake Street 42'
                })
            }
            this.data4 = data4

            const data5 = []
            for (let i = 0; i < 5; i++){
                data5.push({
                    name: 'xmc',
                    age: 23,
                    address: '第1页的数据'
                })
            }
            this.data5 = data5
        }
    }
</script>
<style>
    .gf-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .gf-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .gf-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .gf-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .gf-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .gf-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>