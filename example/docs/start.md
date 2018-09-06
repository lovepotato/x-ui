# 快速上手


## 标准开发

实际项目中，往往会使用 `webpack`，`rollup` 或者 `gulp` 的工作流，大多可以做到按需加载页面用到的组件，所以不推荐直接使用 `<script>` 标签全局引入的方式使用。

### 全局组件使用

可以在项目的入口文件中引入所有组件或所需组件

```js
import gfui from 'gf-uilib' // 引入组件库
import '../node_modules/gf-uilib/lib/styles/gf.css' // 引入样式库

Vue.use(gfui)
```

### 单个组件按需使用

可以局部注册所需的组件，适用于与其他框架组合使用的场景

```js
import { gfTable } from 'gf-uilib'

export default {
  components: {
    gfTable
  }
}
```

在模板中，用 `<gf-table></gf-table>` 自定义标签的方式使用组件

```html
<template>
  <div>
    <gf-table></gf-table>
  </div>
</template>
```
