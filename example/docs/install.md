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
