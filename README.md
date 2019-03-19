# 介绍

----

本组件库一款是基于 `Vue.js 2.0` 的前端 UI 组件库

## 特性

- 基于 `Vue` 开发的 UI 组件
- 使用 npm + webpack + babel + gulp 的工作流，支持 ES2015
- 提供友好的 API，可灵活的使用组件

## 浏览器支持

- 现代浏览器和 IE9 及以上

# 安装

----

## 使用 npm 安装：
推荐使用 npm 的方式进行开发，享受 node 生态圈和 webpack 工具链带来的便利。通过 npm 安装的模块包，我们可以轻松的使用 import 或者 require 的方式引用

```bash
npm install gf-uilib --save
```

## 通过标签引入：
通过标签引入的方式也需要先从npm上下载，下载后进入lib文件夹
### 引入js
```bash
    <script type="text/javascript" src="lib/gf.js"></script>
```

### 引入css
```bash
    <link rel="stylesheet" href="lib/styles/gf.css"></link>
``` 

### 引入字体
字体的引入需要复制```lib/styles/fonts```下面的所有内容，并且```gf.css```必须要和```fonts```文件夹同级

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
