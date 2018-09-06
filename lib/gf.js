(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["gf"] = factory(require("vue"));
	else
		root["gf"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_84__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(27)('wks');
var uid = __webpack_require__(28);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(25);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(48);
var toPrimitive = __webpack_require__(49);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(67);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(20);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(46);
var hide = __webpack_require__(4);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(27)('keys');
var uid = __webpack_require__(28);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    methods: {
        alignCls (column, row = {}) {
            let cellClassName = '';
            if (row.cellClassName && column.key && row.cellClassName[column.key]) {
                cellClassName = row.cellClassName[column.key];
            }
            return [
                {
                    [`${cellClassName}`]: cellClassName,    // cell className
                    [`${column.className}`]: column.className,    // column className
                    [`${this.prefixCls}-column-${column.align}`]: column.align,
                    [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
                }
            ];
        },
        setCellWidth (column, index, top) {
            let width = '';
            if (column.width) {
                width = column.width;
            } else if (this.columnsWidth[column._index]) {
                width = this.columnsWidth[column._index].width;
            }
            // 如果有滚动条，则加滚动条宽度
            // if (this.columns.length === index + 1 && top && this.$parent.bodyHeight !== 0 && this.$parent.isScrollY) {
            //     width += this.$parent.scrollBarWidth;
            // }
            // 如果为右固定，则加滚动条宽度
            // if (this.fixed === 'right') {
            //     const firstFixedIndex = this.columns.findIndex((col) => col.fixed === 'right');
            //     if (firstFixedIndex === index) width += this.$parent.scrollBarWidth;
            // }
            if (width === '0') width = '';
            // if (width == "") width = 50
            // console.log('s')
            return width;
        }
    }
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__table_head_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__table_body_vue__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__table_page_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixin__ = __webpack_require__(18);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var prefixCls = 'gf-table';
var columnKey = 1;
var rowKey = 1;

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'gf-table',
    mixins: [__WEBPACK_IMPORTED_MODULE_7__mixin__["a" /* default */]],
    components: {
        tableHead: __WEBPACK_IMPORTED_MODULE_3__table_head_vue__["a" /* default */],
        tableBody: __WEBPACK_IMPORTED_MODULE_4__table_body_vue__["a" /* default */],
        tablePage: __WEBPACK_IMPORTED_MODULE_5__table_page_vue__["a" /* default */]
    },
    props: {
        data: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        columns: {
            type: Array,
            default: function _default() {
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
            default: function _default() {
                return {};
            }
        },
        disabledHover: {
            type: Boolean,
            default: function _default() {
                return false;
            }
        },
        //设置行Class
        rowClassName: {
            type: Function,
            default: function _default() {
                return '';
            }
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
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
    data: function data() {
        return {
            prefixCls: prefixCls,
            tableData: this.makeData(this.data),
            objData: this.makeObjData(), // 状态管理对象
            cloneColumns: this.makeColumns(),
            ColumnsRow: this.conversionColumn(this.columns),
            leftFixedColumnRows: this.conversionColumn(this.columns, 'left'),
            rightFixedColumnRows: this.conversionColumn(this.columns, 'right'),
            scrollBarWidth: Object(__WEBPACK_IMPORTED_MODULE_6__utils__["b" /* getScrollBarSize */])(),
            rebuildData: [],
            afterDragData: [], //保存拖拽后的数据
            columnsWidth: {},
            bodyHeight: 0,
            tableWidth: 0,
            bodyRealHeight: 0,
            pageData: this.makePageData(this.page),
            currentSort: {}, //当远程分页时，记录当前排序规则 
            isScrollY: false,
            isScrollX: false,
            dragDisableHover: false //解决拖动时表格hover的顺序不一样
        };
    },
    created: function created() {
        this.rebuildData = this.makeDataWithSortAndFilter();
        // this.afterDragData = this.makeDataWithSortAndFilter()
    },
    mounted: function mounted() {
        this.handleResize();

        Object(__WEBPACK_IMPORTED_MODULE_6__utils__["e" /* on */])(window, 'resize', this.handleResize);
    },
    beforeDestroy: function beforeDestroy() {
        Object(__WEBPACK_IMPORTED_MODULE_6__utils__["d" /* off */])(window, 'resize', this.handleResize);
    },

    computed: {
        classes: function classes() {
            var _ref;

            return ['' + prefixCls, prefixCls + '-default', (_ref = {}, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref, prefixCls + '-border', this.border), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref, prefixCls + '-stripe', this.stripe), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref, prefixCls + '-noPage', !this.showPage), _ref)];
        },
        bodyClasses: function bodyClasses() {
            var _ref2;

            return [prefixCls + '-body', (_ref2 = {}, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref2, prefixCls + '-overflowY', this.bodyRealHeight > this.bodyHeight && this.bodyHeight != 0), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_ref2, prefixCls + '-overflowX', this.isScrollX), _ref2)];
        },
        styles: function styles() {
            var style = {};
            if (this.height) {
                // const height = (this.isLeftFixed || this.isRightFixed) ? parseInt(this.height) + this.scrollBarWidth : parseInt(this.height);
                var height = parseInt(this.height);
                style.height = height + 'px';
            }
            if (this.width) style.width = this.width + 'px';
            return style;
        },
        tableStyle: function tableStyle() {
            var style = {};
            if (this.tableWidth !== 0) {
                var width = '';
                if (this.bodyHeight === 0) {
                    width = this.tableWidth;
                } else {
                    width = this.tableWidth - (this.isScrollY ? this.scrollBarWidth : 0);
                }
                //                    const width = this.bodyHeight === 0 ? this.tableWidth : this.tableWidth - this.scrollBarWidth;
                style.width = width + 'px';
            }
            return style;
        },
        tableHeaderStyle: function tableHeaderStyle() {
            var style = {};
            if (this.tableWidth !== 0) {
                var width = '';
                width = this.tableWidth;
                style.width = width + 'px';
            }
            return style;
        },
        bodyStyle: function bodyStyle() {
            var style = {};
            if (this.bodyHeight !== 0) {
                //如果有横向滚动条，则加一个滚动条高度
                var height = this.bodyHeight;
                style.height = height + 'px';
            }
            return style;
        },
        fixedTableStyle: function fixedTableStyle() {
            var style = {};
            var width = 0;
            this.leftFixedColumns.forEach(function (col) {
                if (col.fixed && col.fixed === 'left') width += col._width;
            });
            style.width = width + 'px';
            return style;
        },
        fixedRightTableStyle: function fixedRightTableStyle() {
            var style = {};
            var width = 0;
            this.rightFixedColumns.forEach(function (col) {
                if (col.fixed && col.fixed === 'right') width += col._width;
            });
            //width += this.scrollBarWidth;
            style.width = width + 'px';
            style.right = (this.isScrollY ? this.scrollBarWidth : 0) + 'px';
            return style;
        },
        showPage: function showPage() {
            if (!this.pageData.pageSize) return false;else {
                if (!this.data) return false;else if (!this.isServerPage && this.data.length <= this.pageData.pageSize) {
                    return false;
                } else if (this.pageData.totalPage <= 1) {
                    return false;
                } else {
                    return true;
                }
            }
        },

        //当前表格数据
        currentTableData: function currentTableData() {
            var pageData = this.pageData;
            if (pageData !== {} && pageData.totalPage > 1 && !this.isServerPage) {
                return this.rebuildData.slice((pageData.currentPage - 1) * pageData.pageSize, pageData.currentPage * pageData.pageSize);
            } else {
                return this.rebuildData;
            }
        },
        isServerPage: function isServerPage() {
            if (this.pageData.isServerPage) {
                return true;
            } else return false;
        },
        isLeftFixed: function isLeftFixed() {
            return this.columns.some(function (col) {
                return col.fixed && col.fixed === 'left';
            });
        },
        isRightFixed: function isRightFixed() {
            return this.columns.some(function (col) {
                return col.fixed && col.fixed === 'right';
            });
        },
        fixedHeaderClasses: function fixedHeaderClasses() {
            return [prefixCls + '-fixed-header', __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, prefixCls + '-fixed-header-with-empty', !this.rebuildData.length)];
        },
        fixedBodyStyle: function fixedBodyStyle() {
            var style = {};
            if (this.bodyHeight !== 0) {
                var height = this.bodyHeight - (this.isScrollX ? this.scrollBarWidth : 0);
                style.height = this.isScrollX ? height + 'px' : height - 1 + 'px';
            }
            return style;
        },

        //左浮动表格表头
        leftFixedColumns: function leftFixedColumns() {
            return this.convertColumnOrder(this.cloneColumns, 'left');
        },
        rightFixedColumns: function rightFixedColumns() {
            return this.convertColumnOrder(this.cloneColumns, 'right');
        },

        //当右侧有固定表头时，右侧滚动条表头的样式
        fixedRightHeaderStyle: function fixedRightHeaderStyle() {
            var style = {};
            var width = 0;
            var height = parseInt(Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* getStyle */])(this.$refs.header, 'height')) - 1;
            if (this.isScrollY) {
                width = this.scrollBarWidth;
            }
            style.width = width + 'px';
            style.height = height + 'px';
            return style;
        }
    },
    watch: {
        data: function data(newVal, oldVal) {
            // this.tableData = this.makeData(newVal)

            //如果当前为远程数据，则数据改变时不更新分页数据
            if (!this.isServerPage) this.pageData = this.makePageData(this.page);

            this.objData = this.makeObjData();

            var oldDataLen = this.rebuildData.length;
            this.rebuildData = this.makeDataWithSortAndFilter();
            this.handleResize();
            // if (!oldDataLen) {

            // }
        },

        page: {
            handler: function handler(newVal, oldVal) {
                this.pageData = this.makePageData(this.page);

                this.objData = this.makeObjData();

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
            handler: function handler(newVal, oldVal) {
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
        isScrollX: function isScrollX() {
            this.handleResize();
        },
        isScrollY: function isScrollY() {
            this.handleResize();
        }
    },
    methods: {
        handleResize: function handleResize() {
            var _this = this;

            this.$nextTick(function () {
                var allWidth = !_this.cloneColumns.some(function (cell) {
                    return !cell.width;
                });
                if (allWidth) {
                    _this.tableWidth = _this.cloneColumns.map(function (cell) {
                        return cell.width;
                    }).reduce(function (a, b) {
                        return a + b;
                    }, 0);
                } else {
                    _this.tableWidth = parseInt(Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* getStyle */])(_this.$el, 'width')) - 1;
                }
                _this.columnsWidth = {};
                if (!_this.$refs.tbody) return;
                _this.$nextTick(function () {
                    var columnsWidth = {};
                    var autoWidthIndex = -1;
                    if (allWidth) autoWidthIndex = _this.cloneColumns.findIndex(function (cell) {
                        return !cell.width;
                    }); //todo 这行可能有问题

                    //获取每列宽度
                    if (_this.data.length) {
                        var $td = _this.$refs.tbody.$el.querySelectorAll('tbody tr')[0].children;
                        for (var i = 0; i < $td.length; i++) {
                            var column = _this.cloneColumns[i];

                            var width = parseInt(Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* getStyle */])($td[i], 'width'));
                            if (i === autoWidthIndex) {
                                width = parseInt(Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* getStyle */])($td[i], 'width')) - 1;
                            }
                            if (column.width) width = column.width;

                            _this.cloneColumns[i]._width = width;

                            columnsWidth[column._index] = {
                                width: width
                            };
                        }
                        _this.columnsWidth = columnsWidth;
                    }
                });
                // 获取表格实际高度，用来判断是否显示垂直滚动条
                _this.bodyRealHeight = parseInt(Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* getStyle */])(_this.$refs.tbody.$el, 'height'));
                _this.fixedHeader();
            });
        },
        fixedHeader: function fixedHeader() {
            var _this2 = this;

            if (this.height) {
                this.$nextTick(function () {
                    // const titleHeight = parseInt(getStyle(this.$refs.title.$el, 'height')) || 0;
                    var headerHeight = parseInt(Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* getStyle */])(_this2.$refs.header, 'height')) || 0;
                    var pageHeight = _this2.showPage ? parseInt(Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* getStyle */])(_this2.$refs.page, 'height')) : 0;
                    // const footerHeight = parseInt(getStyle(this.$refs.footer.$el, 'height')) || 0;

                    if (_this2.bodyRealHeight < _this2.height - headerHeight - pageHeight && _this2.bodyRealHeight == 0) {
                        _this2.isScrollY = false;
                        // this.bodyHeight = 0
                    } else {
                        _this2.bodyHeight = _this2.height - headerHeight - pageHeight;
                        _this2.isScrollY = true;
                    }
                    _this2.$nextTick(function () {
                        var bodyContentEl = _this2.$refs.tbody.$el;
                        var bodyEl = bodyContentEl.parentElement;
                        _this2.isScrollX = bodyEl.offsetWidth < bodyContentEl.offsetWidth + (_this2.isScrollY ? _this2.scrollBarWidth : 0);
                    });
                });
            } else {
                this.isScrollY = false;
                this.bodyHeight = 0;

                this.$nextTick(function () {
                    var bodyContentEl = _this2.$refs.tbody.$el;
                    var bodyEl = bodyContentEl.parentElement;

                    _this2.isScrollX = bodyEl.offsetWidth < bodyContentEl.offsetWidth + (_this2.isScrollY ? _this2.scrollBarWidth : 0);
                });
            }
        },

        //鼠标滑动行内触发
        handleMouseIn: function handleMouseIn(_index) {
            if (this.disabledHover || this.dragDisableHover) return;
            if (this.objData[_index]._isHover) return;
            this.objData[_index]._isHover = true;
            // console.log('in', _index)
        },
        handleMouseOut: function handleMouseOut(_index) {
            if (this.disabledHover || this.dragDisableHover) return;
            this.objData[_index]._isHover = false;
            // console.log('out', _index)
        },

        //滑动事件
        handleBodyScroll: function handleBodyScroll(event) {
            this.$refs.header.scrollLeft = event.target.scrollLeft;
            if (this.isLeftFixed) this.$refs.fixedBody.scrollTop = event.target.scrollTop;
            if (this.isRightFixed) this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
        },

        //复制对象用于状态管理
        makeObjData: function makeObjData() {
            var data = {};
            this.data.forEach(function (row, index) {
                var newRow = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* deepCopy */])(row); // todo 直接替换
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
                    newRow._isHighlight = false;
                }
                data[index] = newRow;
            });
            return data;
        },

        //复制data
        makeData: function makeData() {
            var data = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* deepCopy */])(this.data);
            data.forEach(function (row, index) {
                row._index = index;
                row._rowKey = rowKey++;
            });
            return data;
        },

        //实际显示的数据，用于显示和排序
        makeDataWithSort: function makeDataWithSort() {
            var data = this.makeData();
            var sortType = 'normal';
            var sortIndex = -1;
            var isCustom = false;

            for (var i = 0; i < this.cloneColumns.length; i++) {
                if (this.cloneColumns[i]._sortType !== 'normal') {
                    sortType = this.cloneColumns[i]._sortType;
                    sortIndex = i;
                    isCustom = this.cloneColumns[i].sortable === 'custom';
                    break;
                }
            }

            if (sortType !== 'normal' && !isCustom) data = this.sortData(data, sortType, sortIndex);

            //初始化currentSort
            sortIndex = sortIndex === -1 ? 1 : sortIndex;
            var temp = this.cloneColumns[sortIndex].key;
            this.currentSort = {
                key: temp,
                type: sortType
            };
            return data;
        },

        // makeDataWithFilter () {
        //     let data = this.makeData();
        //     this.cloneColumns.forEach(col => data = this.filterData(data, col));
        //     return data;
        // },
        handleSort: function handleSort(index, type) {
            //修改当前排序规则
            var temp = this.cloneColumns[index].key;
            this.currentSort = {
                key: temp,
                type: type
            };
            this.cloneColumns.forEach(function (col) {
                return col._sortType = 'normal';
            });

            var key = this.cloneColumns[index].key;
            if (this.cloneColumns[index].sortable !== 'custom') {
                //排除远程排序
                if (type === 'normal') {
                    // this.rebuildData = this.makeDataWithFilter();
                } else {
                    this.rebuildData = this.sortData(this.rebuildData, type, index);
                }
            }
            this.cloneColumns[index]._sortType = type;

            //触发外部事件
            this.$emit('on-sort-change', {
                column: JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.columns[this.cloneColumns[index]._index])),
                key: key,
                order: type,
                currentPage: this.pageData ? this.pageData.currentPage : undefined,
                pageSize: this.pageData ? this.pageData.pageSize : undefined
            });
        },
        makeDataWithSortAndFilter: function makeDataWithSortAndFilter() {
            var data = this.makeDataWithSort();
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
        sortData: function sortData(data, type, index) {
            var _this3 = this;

            var key = this.cloneColumns[index].key;
            data.sort(function (a, b) {
                if (_this3.cloneColumns[index].sortMethod) {
                    return _this3.cloneColumns[index].sortMethod(a[key], b[key], type);
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
        makeAllColumns: function makeAllColumns(column, level) {
            var _this4 = this;

            var temp = [];
            if (!level) level = 0;
            level++;
            column.map(function (item, index) {
                if (item.children && item.children instanceof Array) {
                    var re = _this4.makeAllColumns(item.children, level);
                    temp = temp.concat(re.temp);
                    if (re.level > level) level = re.level;
                } else {
                    temp.push(item);
                }
            });
            return { temp: temp, level: level };
        },


        //一维表头数组
        getAllColumn: function getAllColumn(array) {
            var _this5 = this;

            var temp = [];
            array.map(function (item, index) {
                if (item.children && item.children instanceof Array) {
                    temp.push(item);
                    temp = temp.concat(_this5.getAllColumn(item.children));
                    temp.col = item.children.length;
                } else {
                    temp.push(item);
                }
            });
            return temp;
        },

        //获取二维表头数组
        conversionColumn: function conversionColumn(columns, fixedType) {
            var array = fixedType ? fixedType === 'left' ? Object(__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* deepCopy */])(this.convertColumnOrder(columns, 'left')) : Object(__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* deepCopy */])(this.convertColumnOrder(columns, 'right')) : Object(__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* deepCopy */])(columns);

            var maxLevel = 1;
            var cv = function cv(column, father) {
                if (father) {
                    column.level = father.level + 1;
                    if (column.level > maxLevel) {
                        maxLevel = column.level;
                    }
                } else {
                    column.level = 1;
                }

                if (column.children) {
                    var col = 0;
                    column.children.forEach(function (sub) {
                        cv(sub, column);
                        col += sub.col;
                    });
                    column.col = col;
                } else {
                    column.col = 1;
                }
            };

            array.forEach(function (item) {
                cv(item);
            });

            // console.log(array)
            var calcArray = [];
            for (var i = 0; i < maxLevel; i++) {
                calcArray.push([]);
            }

            var allColumn = this.getAllColumn(array);

            allColumn.forEach(function (item) {
                if (!item.children) {
                    item.row = maxLevel - item.level + 1;
                } else {
                    item.row = 1;
                }

                calcArray[item.level - 1].push(item);
            });

            return calcArray;
        },

        //复制表头数据，添加状态标识
        makeColumns: function makeColumns() {
            var columns = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* deepCopy */])(this.columns);
            columns = this.makeAllColumns(columns).temp;
            var left = [];
            var right = [];
            var center = [];

            var draggable = this.draggable;
            columns.forEach(function (column, index) {
                column._index = index;
                column._columnKey = columnKey++;
                column._width = column.width ? column.width : ''; // update in handleResize()
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

                if (column.type && column.type == 'expand' && draggable) {
                    console.error('不支持 行拖拽功能 与 行拓展功能 一起使用！请重新设置');
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
        convertColumnOrder: function convertColumnOrder(columns, fixedType) {
            var list = [];
            var other = [];
            columns.forEach(function (col) {
                if (col.fixed && col.fixed === fixedType) {
                    list.push(col);
                } else {
                    other.push(col);
                }
            });
            return list.concat(other);
        },

        //处理分页对象
        makePageData: function makePageData() {
            var page = this.page;
            if (!page || page == {} || !page.pageSize) {
                return {};
            } else {
                if (page.isServerPage) {
                    if (page.pageSize < this.data.length) {
                        console.error("当表格为远程分页时，pageSize必须大于等于当前数据大小");
                        return {};
                    }
                    if (!page.totalPage) {
                        console.error("当表格为远程分页时，必须设置totalPage");
                        return {};
                    }
                    if (!page.pagingCB || typeof page.pagingCB !== "function") {
                        console.error("当表格为远程分页时，必须设置翻页回调函数");
                        return {};
                    }

                    return {
                        pageSize: page.pageSize,
                        currentPage: page.currentPage ? parseInt(page.currentPage) : 1,
                        totalPage: page.totalPage,
                        isServerPage: true,
                        pagingCB: page.pagingCB
                    };
                } else {
                    if (this.data.length <= page.pageSize) {
                        return {};
                    } else {
                        return {
                            pageSize: this.page.pageSize,
                            currentPage: page.currentPage ? parseInt(page.currentPage) : 1,
                            totalPage: Math.ceil(this.data.length / this.page.pageSize)
                        };
                    }
                }
            }
        },

        //页数改变事件
        changePage: function changePage(from, to, pageSize) {
            if (!this.isServerPage) {
                if (to > this.pageData.totalPage) to = this.pageData.totalPage;else if (to < 1) to = 1;
            } else {
                this.pageData.pagingCB(from, to, pageSize, this.currentSort);
            }
            this.pageData.currentPage = to;
        },

        //fixed区域鼠标滑轮事件
        handleFixedMousewheel: function handleFixedMousewheel(event) {
            var deltaY = event.deltaY;
            if (!deltaY && event.detail) {
                deltaY = event.detail * 40;
            }
            if (!deltaY && event.wheelDeltaY) {
                deltaY = -event.wheelDeltaY;
            }
            if (!deltaY && event.wheelDelta) {
                deltaY = -event.wheelDelta;
            }
            if (!deltaY) return;
            var body = this.$refs.body;
            var currentScrollTop = body.scrollTop;
            if (deltaY < 0 && currentScrollTop !== 0) {
                event.preventDefault();
            }
            if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
                event.preventDefault();
            }
            //body.scrollTop += deltaY;
            var step = 0;
            var timeId = setInterval(function () {
                step += 5;
                if (deltaY > 0) {
                    body.scrollTop += 2;
                } else {
                    body.scrollTop -= 2;
                }
                if (step >= Math.abs(deltaY)) {
                    clearInterval(timeId);
                }
            }, 5);
        },

        //获取选中数据
        getSelection: function getSelection() {
            var selectionIndexes = [];
            for (var i in this.objData) {
                if (this.objData[i]._isChecked) selectionIndexes.push(parseInt(i));
            }
            return JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.data.filter(function (data, index) {
                return selectionIndexes.indexOf(index) > -1;
            })));
        },
        selectAll: function selectAll(status) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(this.rebuildData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var data = _step.value;

                    if (this.objData[data._index]._isDisabled) {
                        continue;
                    } else {
                        this.objData[data._index]._isChecked = status;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var selection = this.getSelection();
            if (status) {
                this.$emit('on-select-all', selection);
            }
            this.$emit('on-selection-change', selection);
        },
        toggleSelect: function toggleSelect(_index) {
            var data = {};

            for (var i in this.objData) {
                if (parseInt(i) === _index) {
                    data = this.objData[i];
                    break;
                }
            }
            var status = !data._isChecked;

            this.objData[_index]._isChecked = status;

            var selection = this.getSelection();
            this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.data[_index])));
            this.$emit('on-selection-change', selection);
        },
        toggleExpand: function toggleExpand(_index) {
            var data = {};

            for (var i in this.objData) {
                if (parseInt(i) === _index) {
                    data = this.objData[i];
                    break;
                }
            }
            var status = !data._isExpanded;
            this.objData[_index]._isExpanded = status;
            this.$emit('on-expand', JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.data[_index])), status);
        },
        highlightCurrentRow: function highlightCurrentRow(_index) {
            if (!this.highlightRow || this.objData[_index]._isHighlight) return;
            this.handleCurrentRow('highlight', _index);
        },
        clearCurrentRow: function clearCurrentRow() {
            if (!this.highlightRow) return;
            this.handleCurrentRow('clear');
        },
        clickCurrentRow: function clickCurrentRow(_index) {
            this.highlightCurrentRow(_index);
            this.$emit('on-row-click', JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.data[_index])), _index);
        },
        dblclickCurrentRow: function dblclickCurrentRow(_index) {
            this.highlightCurrentRow(_index);
            this.$emit('on-row-dblclick', JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(this.data[_index])), _index);
        },
        dragChangeData: function dragChangeData(data, newIndex, oldIndex, item) {
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
            this.rebuildData = data;
            this.$emit('on-drag-end', newIndex, oldIndex, item);
        },
        clearHover: function clearHover() {
            for (var i in this.objData) {
                this.objData[parseInt(i)]._isHover = false;
            }
            // this.dragDisableHover = true
        },
        getTableData: function getTableData() {
            var tempData = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* deepCopy */])(this.rebuildData);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(tempData), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    delete value._index;
                    delete value._rowKey;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return tempData;
        }
    }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(23);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(50);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(6);
var $iterCreate = __webpack_require__(51);
var setToStringTag = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(59);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(54);
var enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(23) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixin__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__headRender__ = __webpack_require__(77);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'gf-table-head',
    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixin__["a" /* default */]],
    components: { renderHead: __WEBPACK_IMPORTED_MODULE_3__headRender__["a" /* default */] },
    props: {
        prefixCls: String,
        styleObject: Object,
        columns: Array,
        objData: Object,
        data: Array, // rebuildDataData
        columnsWidth: Object,
        columnsRow: Array,
        fixed: {
            type: [Boolean, String],
            default: false
        },
        fixedColumnRows: Array
    },
    methods: {
        cellClasses: function cellClasses(column) {
            return [this.prefixCls + '-cell', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, this.prefixCls + '-hidden', !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))];
        },
        handleSort: function handleSort(trindex, thindex, type) {
            var _this = this;

            var index = this.columns.findIndex(function (item) {
                return item.key == _this.columnsRow[trindex][thindex].key;
            });
            if (index > -1) {
                if (this.columns[index]._sortType === type) {
                    type = 'normal';
                }
                this.$parent.handleSort(index, type);
            }
        },
        handleSortByHead: function handleSortByHead(column, trindex, thindex) {
            var _this2 = this;

            if (!column.renderHeader) {
                var index = this.columns.findIndex(function (item) {
                    return item.key == _this2.columnsRow[trindex][thindex].key;
                });
                if (index > -1) {
                    var _column = this.columns[index];
                    if (_column.sortable) {
                        var type = _column._sortType;
                        if (type === 'normal') {
                            this.handleSort(trindex, thindex, 'asc');
                        } else if (type === 'asc') {
                            this.handleSort(trindex, thindex, 'desc');
                        } else {
                            this.handleSort(trindex, thindex, 'normal');
                        }
                    }
                }
            }
        },
        scrollBarCellClass: function scrollBarCellClass() {
            var hasRightFixed = false;
            for (var i in this.headRows) {
                for (var j in this.headRows[i]) {
                    if (this.headRows[i][j].fixed === 'right') {
                        hasRightFixed = true;
                        break;
                    }
                    if (hasRightFixed) break;
                }
            }
            return [__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, this.prefixCls + '-hidden', hasRightFixed)];
        },
        selectionBox: function selectionBox(event) {
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
            this.$parent.selectAll(!this.isAllSelect);
        }
    },
    computed: {
        styles: function styles() {
            var style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, this.styleObject);
            var width = parseInt(this.styleObject.width);
            style.width = width + 'px';
            return style;
        },
        thStyle: function thStyle(sortable) {
            return function (sortable) {
                if (sortable) {
                    return {
                        cursor: 'pointer',
                        userSelect: 'none'
                    };
                } else {
                    return {};
                }
            };
        },
        iconOn: function iconOn(trindex, thindex, type) {
            var _this3 = this;

            return function (trindex, thindex, type) {
                var item = _this3.columns.find(function (item) {
                    return item.key == _this3.columnsRow[trindex][thindex].key;
                });
                if (item._sortType == type) {
                    return 'on';
                } else {
                    return "";
                }
            };
        },
        headRows: function headRows() {
            var isGroup = this.columnsRow.length > 1;
            if (isGroup) {
                return this.fixed ? this.fixedColumnRows : this.columnsRow;
            } else {
                return [this.columns];
            }
        },
        isAllSelect: function isAllSelect() {
            var isSelectAll = true;
            if (!this.data.length) isSelectAll = false;
            if (!this.data.find(function (item) {
                return !item._disabled;
            })) isSelectAll = false;
            for (var i = 0; i < this.data.length; i++) {
                if (!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled) {
                    isSelectAll = false;
                    break;
                }
            }
            return isSelectAll;
        }
    }
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cell_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cellRender__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuedraggable__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuedraggable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuedraggable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(36);


var _methods;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'gf-table-body',
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixin__["a" /* default */]],
    components: { Cell: __WEBPACK_IMPORTED_MODULE_2__cell_vue__["a" /* default */], Expand: __WEBPACK_IMPORTED_MODULE_3__cellRender__["a" /* default */], draggable: __WEBPACK_IMPORTED_MODULE_4_vuedraggable___default.a },
    props: {
        prefixCls: String,
        styleObject: Object,
        columns: Array,
        data: Array, // rebuildData
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
    data: function data() {
        return {
            enableEdit: true,
            enableDrag: true,
            cloneData: Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* deepCopy */])(this.data),
            fallbackOnBody: true
        };
    },

    computed: {
        expandRender: function expandRender() {
            var render = function render() {
                return '';
            };
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                if (column.type && column.type === 'expand') {
                    if (column.render) render = column.render;
                }
            }
            return render;
        },
        options: function options() {
            return {
                animation: 100,
                sort: true,
                disabled: !this.draggable && this.enableDrag,
                chosenClass: this.prefixCls + "-drag-tr"
            };
        }
    },
    methods: (_methods = {
        rowChecked: function rowChecked(_index) {
            return this.objData[_index] && this.objData[_index]._isChecked;
        },
        rowDisabled: function rowDisabled(_index) {
            return this.objData[_index] && this.objData[_index]._isDisabled;
        },
        rowExpanded: function rowExpanded(_index) {
            return this.objData[_index] && this.objData[_index]._isExpanded;
        },
        handleMouseIn: function handleMouseIn(_index) {
            this.$parent.handleMouseIn(_index);
            // console.log(_index)
        },
        handleMouseOut: function handleMouseOut(_index) {
            this.$parent.handleMouseOut(_index);
        },
        rowClasses: function rowClasses(_index) {
            var _ref;

            return [this.prefixCls + '-row', this.rowClsName(_index), (_ref = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.prefixCls + '-row-highlight', this.objData[_index] && this.objData[_index]._isHighlight), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.prefixCls + '-row-hover', this.objData[_index] && this.objData[_index]._isHover), _ref)];
        },
        rowClsName: function rowClsName(_index) {
            return this.$parent.rowClassName(this.objData[_index], _index);
        }
    }, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'rowExpanded', function rowExpanded(_index) {
        return this.objData[_index] && this.objData[_index]._isExpanded;
    }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'tdClick', function tdClick(column, row) {
        if (column.type == "input") {}
        // row._isClicked = true

        // console.log(column,row)
    }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'changeExpand', function changeExpand(index) {
        this.objData[index]._isExpanded = !this.objData[index]._isExpanded;
    }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'draggableEnd', function draggableEnd(evt) {
        var _this = this;

        console.log(evt);
        // evt.item.classList.remove('gf-table-drag-tr')
        var newIndex = evt.newIndex;
        var oldIndex = evt.oldIndex;
        this.$parent.dragDisableHover = false;
        this.$nextTick(function () {
            if (newIndex != oldIndex) {
                _this.$emit('drag-change-data-sort', _this.cloneData, newIndex, oldIndex, evt.item);
            }
        });
    }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'draggableStart', function draggableStart(evt) {
        // evt.item.classList.add('gf-table-drag-tr')
        this.$parent.clearHover();
        this.$parent.dragDisableHover = true;
    }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'clickCurrentRow', function clickCurrentRow(_index) {
        this.$parent.clickCurrentRow(_index);
    }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_methods, 'dblclickCurrentRow', function dblclickCurrentRow(_index) {
        this.$parent.dblclickCurrentRow(_index);
    }), _methods),
    watch: {
        enableEdit: function enableEdit(val) {
            // console.log(val)
        },
        data: function data(a, b) {
            this.cloneData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* deepCopy */])(a);
        },
        draggable: function draggable(n) {
            var _this2 = this;

            if (n) {
                this.$nextTick(function () {
                    _this2.$refs.dragbody.computeIndexes(); //取消v-if带来的注释节点对拖拽的影响
                });
            }
        }
    }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cellRender__ = __webpack_require__(35);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'gf-table-cell',
    components: { renderCell: __WEBPACK_IMPORTED_MODULE_1__cellRender__["a" /* default */] },
    props: {
        prefixCls: String,
        row: Object,
        column: Object,
        naturalIndex: Number, // index of rebuildData
        index: Number, // _index of data
        checked: Boolean,
        disabled: Boolean,
        expanded: Boolean,
        fixed: {
            type: [Boolean, String],
            default: false
        },
        enableEdit: { //编辑状态  
            type: Boolean
        }
    },
    data: function data() {
        return {
            renderType: '',
            isEditing: false,
            prevData: this.row[this.column.key],
            isExpand: false
        };
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
        classes: function classes() {
            var _ref;

            return [this.prefixCls + '-cell', (_ref = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.prefixCls + '-hidden', !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right')), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.prefixCls + '-cell-ellipsis', this.column.ellipsis || false), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.prefixCls + '-cell-with-expand', this.renderType === 'expand'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.prefixCls + '-editing', this.renderType === 'input' && this.enableEditing), _ref)];
        },
        enableEditing: function enableEditing() {
            if (this.isEditing && this.enableEdit) {
                return true;
            } else {
                return false;
            }
        },
        isChecked: function isChecked(index) {
            var _this = this;

            return function (index) {
                return [__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, 'checked', _this.$parent.$parent.objData[index]._isChecked)];
            };
        },
        isSelect: function isSelect() {
            return this.$parent.$parent.objData[this.index]._isChecked;
        }
    },
    methods: {
        clickCell: function clickCell(row, column) {
            if (this.renderType == 'input') {
                this.$parent.$parent.enableEdit = true;
                this.isEditing = true;
            }
        },
        changeEditState: function changeEditState() {
            this.isEditing = false;
            this.$parent.$parent.enableEdit = false;

            //与上一次数据比较，有改动则触发用户自定义的数据改变事件
            if (this.prevData !== this.row[this.column.key]) {
                if (this.column.onChangeData && typeof this.column.onChangeData == "function") {
                    if (!this.column.onChangeData(this.row, this.column.key)) {
                        this.row[this.column.key] = this.prevData; //如果返回false，则恢复原来数据
                    } else {
                        this.prevData = this.row[this.column.key];
                    }
                }
            }
        },
        emitExpand: function emitExpand() {
            if (this.$parent.$parent.objData[this.index]._isExpanded) {
                this.isExpand = false;
            } else {
                this.isExpand = true;
            }
            // this.$emit('changeExpand',this.index)
            this.$parent.$parent.$parent.toggleExpand(this.index);
        },
        singleSelect: function singleSelect() {
            this.$parent.$parent.$parent.toggleSelect(this.index);
        }
    },
    created: function created() {
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
            inserted: function inserted(el) {
                el.focus();
            }
        }
    }
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'cellRender',
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
    }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getScrollBarSize;
/* harmony export (immutable) */ __webpack_exports__["a"] = deepCopy;
/* harmony export (immutable) */ __webpack_exports__["c"] = getStyle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

const isServer = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer;
// For Modal scrollBar hidden
let cached;
function getScrollBarSize (fresh) {
    if (isServer) return 0;
    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
}

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number', 
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
}

// deepCopy
function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if ( t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if ( t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
// getStyle
function getStyle (element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch(e) {
        return element.style[styleName];
    }
}

/* istanbul ignore next */
const on = (function() {
    if (!isServer && document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
/* harmony export (immutable) */ __webpack_exports__["e"] = on;


/* istanbul ignore next */
const off = (function() {
    if (!isServer && document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();
/* harmony export (immutable) */ __webpack_exports__["d"] = off;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'gf-table-page',
    props: {
        prefixCls: String,
        pageSize: {
            type: [Number, String],
            default: function _default() {
                return 10;
            }
        },
        currentPage: {
            type: [Number, String],
            default: function _default() {
                return 1;
            }
        },
        totalPage: {
            type: [Number, String],
            default: function _default() {
                return 0;
            }
        },
        totalItem: {
            type: [Number, String]
        },
        //是否为远程分页
        isServerPage: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            showNumber: 5,
            skipPage: ""
        };
    },

    computed: {
        firstNum: function firstNum() {
            return 1;
        },
        lastNum: function lastNum() {
            return this.totalPage;
        },
        secondNum: function secondNum() {
            var showPointsFront = this.showPointsFront;
            var showPointsEnd = this.showPointsEnd;
            if (showPointsFront && !showPointsEnd) {
                return this.totalPage - 3;
            } else if (showPointsEnd && !showPointsFront || !showPointsFront && !showPointsEnd) {
                return 2;
            } else if (showPointsFront && showPointsEnd) {
                return this.currentPage - 1;
            }
        },

        //是否显示后面省略号
        showPointsEnd: function showPointsEnd() {
            var showNumber = this.showNumber;
            if (this.totalPage > showNumber) {
                if (this.currentPage <= this.totalPage - 3) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        //是否显示前面省略号
        showPointsFront: function showPointsFront() {
            var showNumber = this.showNumber;
            if (this.totalPage > showNumber) {
                if (this.currentPage >= 4) {
                    return true;
                } else return false;
            } else {
                return false;
            }
        },
        currentClass: function currentClass(num) {
            var _this = this;

            return function (num) {
                if (num === _this.currentPage) {
                    return _this.prefixCls + '-pageNum ' + _this.prefixCls + '-currentPage';
                } else {
                    return _this.prefixCls + '-pageNum ' + _this.prefixCls + '-commonPage';
                }
            };
        }
    },
    methods: {
        goPage: function goPage(num) {
            this.$emit('onChangePage', this.currentPage, num, this.pageSize);
        },
        jumpPage: function jumpPage() {
            if (this.skipPage > 0) {
                this.$emit('onChangePage', this.currentPage, parseInt(this.skipPage), this.pageSize);
            }
            this.skipPage = "";
        }
    }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__packages_table_table_vue__ = __webpack_require__(39);


var install = function install(Vue) {
    if (install.installed) return;

    Vue.component(__WEBPACK_IMPORTED_MODULE_0__packages_table_table_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__packages_table_table_vue__["a" /* default */]);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

/* harmony default export */ __webpack_exports__["default"] = ({
    gfTable: __WEBPACK_IMPORTED_MODULE_0__packages_table_table_vue__["a" /* default */],
    install: install
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__ = __webpack_require__(19);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4a831c42_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__ = __webpack_require__(88);
var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4a831c42_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\table\\table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a831c42", Component.options)
  } else {
    hotAPI.reload("data-v-4a831c42", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(60);
module.exports = __webpack_require__(62);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
var global = __webpack_require__(1);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(6);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(44);
var step = __webpack_require__(45);
var Iterators = __webpack_require__(6);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(22)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(47);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(15)(function () {
  return Object.defineProperty(__webpack_require__(24)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(52);
var descriptor = __webpack_require__(25);
var setToStringTag = __webpack_require__(30);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(53);
var enumBugKeys = __webpack_require__(29);
var IE_PROTO = __webpack_require__(17)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(24)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(58).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(26);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(55)(false);
var IE_PROTO = __webpack_require__(17)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(56);
var toAbsoluteIndex = __webpack_require__(57);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(16);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(16);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(31);
var IE_PROTO = __webpack_require__(17)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(61)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(22)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(16);
var defined = __webpack_require__(12);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var get = __webpack_require__(63);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(64);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(6);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(13);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_head_vue__ = __webpack_require__(32);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c166e84_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_head_vue__ = __webpack_require__(78);
var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_head_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c166e84_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_head_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\table\\table-head.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c166e84", Component.options)
  } else {
    hotAPI.reload("data-v-2c166e84", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(13);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(74) });


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(26);
var gOPS = __webpack_require__(75);
var pIE = __webpack_require__(76);
var toObject = __webpack_require__(31);
var IObject = __webpack_require__(20);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(15)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'renderHead',
    functional: true,
    props: {
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        const params = {
            column: ctx.props.column,
            index: ctx.props.index
        };
        return ctx.props.render(h, params);
    }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      style: _vm.styles,
      attrs: { cellspacing: "0", cellpadding: "0", border: "0" }
    },
    [
      _c(
        "colgroup",
        [
          _vm._l(_vm.columns, function(column, index) {
            return _c("col", {
              attrs: { width: _vm.setCellWidth(column, index, true) }
            })
          }),
          _vm._v(" "),
          _vm.$parent.isScrollY
            ? _c("col", { attrs: { width: _vm.$parent.scrollBarWidth } })
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "thead",
        _vm._l(_vm.headRows, function(columns, trIndex) {
          return _c(
            "tr",
            [
              _vm._l(columns, function(column, thIndex) {
                return _c(
                  "th",
                  {
                    class: _vm.alignCls(column),
                    style: _vm.thStyle(column.sortable),
                    attrs: { colspan: column.col, rowspan: column.row },
                    on: {
                      click: function($event) {
                        _vm.handleSortByHead(column, trIndex, thIndex)
                      }
                    }
                  },
                  [
                    _c(
                      "div",
                      { class: _vm.cellClasses(column) },
                      [
                        column.type == "expand"
                          ? [
                              !column.renderHeader
                                ? _c("span", [
                                    _vm._v(" " + _vm._s(column.title || ""))
                                  ])
                                : _c("render-head", {
                                    attrs: {
                                      column: column,
                                      index: thIndex,
                                      render: column.renderHeader
                                    }
                                  })
                            ]
                          : column.renderHeader
                            ? [
                                _c("render-head", {
                                  attrs: {
                                    column: column,
                                    index: thIndex,
                                    render: column.renderHeader
                                  }
                                })
                              ]
                            : column.type == "selection"
                              ? [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.isAllSelect,
                                        expression: "isAllSelect"
                                      }
                                    ],
                                    attrs: { type: "checkbox" },
                                    domProps: {
                                      checked: Array.isArray(_vm.isAllSelect)
                                        ? _vm._i(_vm.isAllSelect, null) > -1
                                        : _vm.isAllSelect
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        $event.stopPropagation()
                                        _vm.selectionBox($event)
                                      },
                                      change: function($event) {
                                        var $$a = _vm.isAllSelect,
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              (_vm.isAllSelect = $$a.concat([
                                                $$v
                                              ]))
                                          } else {
                                            $$i > -1 &&
                                              (_vm.isAllSelect = $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1)))
                                          }
                                        } else {
                                          _vm.isAllSelect = $$c
                                        }
                                      }
                                    }
                                  })
                                ]
                              : [
                                  _c("span", [
                                    _vm._v(_vm._s(column.title || "#"))
                                  ]),
                                  _vm._v(" "),
                                  column.sortable
                                    ? _c(
                                        "span",
                                        { class: [_vm.prefixCls + "-sort"] },
                                        [
                                          _c("i", {
                                            staticClass:
                                              "gf-icon icon-android-arrow-dropup",
                                            class: _vm.iconOn(
                                              trIndex,
                                              thIndex,
                                              "asc"
                                            ),
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                _vm.handleSort(
                                                  trIndex,
                                                  thIndex,
                                                  "asc"
                                                )
                                              }
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("i", {
                                            staticClass:
                                              "gf-icon icon-android-arrow-dropdown",
                                            class: _vm.iconOn(
                                              trIndex,
                                              thIndex,
                                              "desc"
                                            ),
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                _vm.handleSort(
                                                  trIndex,
                                                  thIndex,
                                                  "desc"
                                                )
                                              }
                                            }
                                          })
                                        ]
                                      )
                                    : _vm._e()
                                ]
                      ],
                      2
                    )
                  ]
                )
              }),
              _vm._v(" "),
              _vm.$parent.isScrollY && trIndex === 0
                ? _c("th", {
                    class: _vm.scrollBarCellClass(),
                    attrs: { rowspan: _vm.headRows.length }
                  })
                : _vm._e()
            ],
            2
          )
        })
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2c166e84", esExports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_body_vue__ = __webpack_require__(33);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dc1af900_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_body_vue__ = __webpack_require__(85);
var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_body_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dc1af900_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_body_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\table\\table-body.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dc1af900", Component.options)
  } else {
    hotAPI.reload("data-v-dc1af900", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_cell_vue__ = __webpack_require__(34);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0deded61_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_cell_vue__ = __webpack_require__(81);
var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_cell_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0deded61_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_cell_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\table\\cell.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0deded61", Component.options)
  } else {
    hotAPI.reload("data-v-0deded61", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "cell",
      class: _vm.classes,
      on: {
        click: function($event) {
          _vm.clickCell(_vm.row, _vm.column)
        }
      }
    },
    [
      _vm.renderType === "index"
        ? [_vm._v(_vm._s(_vm.naturalIndex + 1))]
        : _vm.renderType === "expand" && !_vm.row._disableExpand
          ? [
              _c(
                "div",
                {
                  class: [
                    _vm.prefixCls + "-cell-expand",
                    ((_obj = {}),
                    (_obj[_vm.prefixCls + "-cell-expand-expanded"] =
                      _vm.isExpand),
                    _obj)
                  ],
                  on: { click: _vm.emitExpand }
                },
                [_c("i", { staticClass: "gf-icon icon-ios-arrow-forward" })]
              )
            ]
          : _vm.renderType === "input"
            ? [
                _vm.enableEditing
                  ? _c("input", {
                      directives: [
                        { name: "focus", rawName: "v-focus" },
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.row[_vm.column.key],
                          expression: "row[column.key]"
                        }
                      ],
                      class: [_vm.prefixCls + "-input"],
                      attrs: { type: "text" },
                      domProps: { value: _vm.row[_vm.column.key] },
                      on: {
                        blur: _vm.changeEditState,
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.row, _vm.column.key, $event.target.value)
                        }
                      }
                    })
                  : _c("span", [_vm._v(_vm._s(_vm.row[_vm.column.key]))])
              ]
            : _vm.renderType === "selection"
              ? [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.isSelect,
                        expression: "isSelect"
                      }
                    ],
                    attrs: { type: "checkbox", disabled: _vm.disabled },
                    domProps: {
                      checked: Array.isArray(_vm.isSelect)
                        ? _vm._i(_vm.isSelect, null) > -1
                        : _vm.isSelect
                    },
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        $event.preventDefault()
                        return _vm.singleSelect($event)
                      },
                      change: function($event) {
                        var $$a = _vm.isSelect,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 && (_vm.isSelect = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.isSelect = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.isSelect = $$c
                        }
                      }
                    }
                  })
                ]
              : _vm.renderType === "render"
                ? [
                    _c("render-cell", {
                      attrs: {
                        row: _vm.row,
                        column: _vm.column,
                        index: _vm.index,
                        render: _vm.column.render
                      }
                    })
                  ]
                : [_c("span", [_vm._v(_vm._s(_vm.row[_vm.column.key]))])]
    ],
    2
  )
  var _obj
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0deded61", esExports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  "use strict";

  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  }

  function buildAttribute(object, propName, value) {
    if (value == undefined) {
      return object;
    }
    object = object == null ? {} : object;
    object[propName] = value;
    return object;
  }

  function buildDraggable(Sortable) {
    function removeNode(node) {
      node.parentElement.removeChild(node);
    }

    function insertNodeAt(fatherNode, node, position) {
      var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
      fatherNode.insertBefore(node, refNode);
    }

    function computeVmIndex(vnodes, element) {
      return vnodes.map(function (elt) {
        return elt.elm;
      }).indexOf(element);
    }

    function _computeIndexes(slots, children, isTransition) {
      if (!slots) {
        return [];
      }

      var elmFromNodes = slots.map(function (elt) {
        return elt.elm;
      });
      var rawIndexes = [].concat(_toConsumableArray(children)).map(function (elt) {
        return elmFromNodes.indexOf(elt);
      });
      return isTransition ? rawIndexes.filter(function (ind) {
        return ind !== -1;
      }) : rawIndexes;
    }

    function emit(evtName, evtData) {
      var _this = this;

      this.$nextTick(function () {
        return _this.$emit(evtName.toLowerCase(), evtData);
      });
    }

    function delegateAndEmit(evtName) {
      var _this2 = this;

      return function (evtData) {
        if (_this2.realList !== null) {
          _this2['onDrag' + evtName](evtData);
        }
        emit.call(_this2, evtName, evtData);
      };
    }

    var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
    var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
    var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (evt) {
      return 'on' + evt;
    });
    var draggingElement = null;

    var props = {
      options: Object,
      list: {
        type: Array,
        required: false,
        default: null
      },
      value: {
        type: Array,
        required: false,
        default: null
      },
      noTransitionOnDrag: {
        type: Boolean,
        default: false
      },
      clone: {
        type: Function,
        default: function _default(original) {
          return original;
        }
      },
      element: {
        type: String,
        default: 'div'
      },
      move: {
        type: Function,
        default: null
      },
      componentData: {
        type: Object,
        required: false,
        default: null
      }
    };

    var draggableComponent = {
      name: 'draggable',

      props: props,

      data: function data() {
        return {
          transitionMode: false,
          noneFunctionalComponentMode: false,
          init: false
        };
      },
      render: function render(h) {
        var slots = this.$slots.default;
        if (slots && slots.length === 1) {
          var child = slots[0];
          if (child.componentOptions && child.componentOptions.tag === "transition-group") {
            this.transitionMode = true;
          }
        }
        var children = slots;
        var footer = this.$slots.footer;

        if (footer) {
          children = slots ? [].concat(_toConsumableArray(slots), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));
        }
        var attributes = null;
        var update = function update(name, value) {
          attributes = buildAttribute(attributes, name, value);
        };
        update('attrs', this.$attrs);
        if (this.componentData) {
          var _componentData = this.componentData,
              on = _componentData.on,
              _props = _componentData.props;

          update('on', on);
          update('props', _props);
        }
        return h(this.element, attributes, children);
      },
      mounted: function mounted() {
        var _this3 = this;

        this.noneFunctionalComponentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
        if (this.noneFunctionalComponentMode && this.transitionMode) {
          throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);
        }
        var optionsAdded = {};
        eventsListened.forEach(function (elt) {
          optionsAdded['on' + elt] = delegateAndEmit.call(_this3, elt);
        });

        eventsToEmit.forEach(function (elt) {
          optionsAdded['on' + elt] = emit.bind(_this3, elt);
        });

        var options = _extends({}, this.options, optionsAdded, { onMove: function onMove(evt, originalEvent) {
            return _this3.onDragMove(evt, originalEvent);
          } });
        !('draggable' in options) && (options.draggable = '>*');
        this._sortable = new Sortable(this.rootContainer, options);
        this.computeIndexes();
      },
      beforeDestroy: function beforeDestroy() {
        this._sortable.destroy();
      },


      computed: {
        rootContainer: function rootContainer() {
          return this.transitionMode ? this.$el.children[0] : this.$el;
        },
        isCloning: function isCloning() {
          return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
        },
        realList: function realList() {
          return !!this.list ? this.list : this.value;
        }
      },

      watch: {
        options: {
          handler: function handler(newOptionValue) {
            for (var property in newOptionValue) {
              if (readonlyProperties.indexOf(property) == -1) {
                this._sortable.option(property, newOptionValue[property]);
              }
            }
          },

          deep: true
        },

        realList: function realList() {
          this.computeIndexes();
        }
      },

      methods: {
        getChildrenNodes: function getChildrenNodes() {
          if (!this.init) {
            this.noneFunctionalComponentMode = this.noneFunctionalComponentMode && this.$children.length == 1;
            this.init = true;
          }

          if (this.noneFunctionalComponentMode) {
            return this.$children[0].$slots.default;
          }
          var rawNodes = this.$slots.default;
          return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
        },
        computeIndexes: function computeIndexes() {
          var _this4 = this;

          this.$nextTick(function () {
            _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode);
          });
        },
        getUnderlyingVm: function getUnderlyingVm(htmlElt) {
          var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
          if (index === -1) {
            //Edge case during move callback: related element might be
            //an element different from collection
            return null;
          }
          var element = this.realList[index];
          return { index: index, element: element };
        },
        getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
          var __vue__ = _ref.__vue__;

          if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
            return __vue__;
          }
          return __vue__.$parent;
        },
        emitChanges: function emitChanges(evt) {
          var _this5 = this;

          this.$nextTick(function () {
            _this5.$emit('change', evt);
          });
        },
        alterList: function alterList(onList) {
          if (!!this.list) {
            onList(this.list);
          } else {
            var newList = [].concat(_toConsumableArray(this.value));
            onList(newList);
            this.$emit('input', newList);
          }
        },
        spliceList: function spliceList() {
          var _arguments = arguments;

          var spliceList = function spliceList(list) {
            return list.splice.apply(list, _arguments);
          };
          this.alterList(spliceList);
        },
        updatePosition: function updatePosition(oldIndex, newIndex) {
          var updatePosition = function updatePosition(list) {
            return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
          };
          this.alterList(updatePosition);
        },
        getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
          var to = _ref2.to,
              related = _ref2.related;

          var component = this.getUnderlyingPotencialDraggableComponent(to);
          if (!component) {
            return { component: component };
          }
          var list = component.realList;
          var context = { list: list, component: component };
          if (to !== related && list && component.getUnderlyingVm) {
            var destination = component.getUnderlyingVm(related);
            if (destination) {
              return _extends(destination, context);
            }
          }

          return context;
        },
        getVmIndex: function getVmIndex(domIndex) {
          var indexes = this.visibleIndexes;
          var numberIndexes = indexes.length;
          return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
        },
        getComponent: function getComponent() {
          return this.$slots.default[0].componentInstance;
        },
        resetTransitionData: function resetTransitionData(index) {
          if (!this.noTransitionOnDrag || !this.transitionMode) {
            return;
          }
          var nodes = this.getChildrenNodes();
          nodes[index].data = null;
          var transitionContainer = this.getComponent();
          transitionContainer.children = [];
          transitionContainer.kept = undefined;
        },
        onDragStart: function onDragStart(evt) {
          this.context = this.getUnderlyingVm(evt.item);
          evt.item._underlying_vm_ = this.clone(this.context.element);
          draggingElement = evt.item;
        },
        onDragAdd: function onDragAdd(evt) {
          var element = evt.item._underlying_vm_;
          if (element === undefined) {
            return;
          }
          removeNode(evt.item);
          var newIndex = this.getVmIndex(evt.newIndex);
          this.spliceList(newIndex, 0, element);
          this.computeIndexes();
          var added = { element: element, newIndex: newIndex };
          this.emitChanges({ added: added });
        },
        onDragRemove: function onDragRemove(evt) {
          insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
          if (this.isCloning) {
            removeNode(evt.clone);
            return;
          }
          var oldIndex = this.context.index;
          this.spliceList(oldIndex, 1);
          var removed = { element: this.context.element, oldIndex: oldIndex };
          this.resetTransitionData(oldIndex);
          this.emitChanges({ removed: removed });
        },
        onDragUpdate: function onDragUpdate(evt) {
          removeNode(evt.item);
          insertNodeAt(evt.from, evt.item, evt.oldIndex);
          var oldIndex = this.context.index;
          var newIndex = this.getVmIndex(evt.newIndex);
          this.updatePosition(oldIndex, newIndex);
          var moved = { element: this.context.element, oldIndex: oldIndex, newIndex: newIndex };
          this.emitChanges({ moved: moved });
        },
        computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
          if (!relatedContext.element) {
            return 0;
          }
          var domChildren = [].concat(_toConsumableArray(evt.to.children)).filter(function (el) {
            return el.style['display'] !== 'none';
          });
          var currentDOMIndex = domChildren.indexOf(evt.related);
          var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
          var draggedInList = domChildren.indexOf(draggingElement) != -1;
          return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
        },
        onDragMove: function onDragMove(evt, originalEvent) {
          var onMove = this.move;
          if (!onMove || !this.realList) {
            return true;
          }

          var relatedContext = this.getRelatedContextFromMoveEvent(evt);
          var draggedContext = this.context;
          var futureIndex = this.computeFutureIndex(relatedContext, evt);
          _extends(draggedContext, { futureIndex: futureIndex });
          _extends(evt, { relatedContext: relatedContext, draggedContext: draggedContext });
          return onMove(evt, originalEvent);
        },
        onDragEnd: function onDragEnd(evt) {
          this.computeIndexes();
          draggingElement = null;
        }
      }
    };
    return draggableComponent;
  }

  if (true) {
    var Sortable = __webpack_require__(83);
    module.exports = buildDraggable(Sortable);
  } else if (typeof define == "function" && define.amd) {
    define(['sortablejs'], function (Sortable) {
      return buildDraggable(Sortable);
    });
  } else if (window && window.Vue && window.Sortable) {
    var draggable = buildDraggable(window.Sortable);
    Vue.component('draggable', draggable);
  }
})();

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_84__;

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      style: _vm.styleObject,
      attrs: { cellspacing: "0", cellpadding: "0", border: "0" },
      on: {
        keyup: function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
          ) {
            return null
          }
          _vm.enableEdit = false
        }
      }
    },
    [
      _c(
        "colgroup",
        _vm._l(_vm.columns, function(column, index) {
          return _c("col", {
            attrs: { width: _vm.setCellWidth(column, index, false) }
          })
        })
      ),
      _vm._v(" "),
      !_vm.draggable
        ? [
            _c(
              "draggable",
              {
                class: [_vm.prefixCls + "-tbody"],
                attrs: { element: "tbody", options: _vm.options },
                on: { start: _vm.draggableStart, end: _vm.draggableEnd },
                model: {
                  value: _vm.cloneData,
                  callback: function($$v) {
                    _vm.cloneData = $$v
                  },
                  expression: "cloneData"
                }
              },
              [
                _vm._l(_vm.cloneData, function(row, index) {
                  return [
                    _c(
                      "tr",
                      {
                        class: _vm.rowClasses(row._index),
                        on: {
                          mouseenter: function($event) {
                            $event.stopPropagation()
                            _vm.handleMouseIn(row._index)
                          },
                          mouseleave: function($event) {
                            $event.stopPropagation()
                            _vm.handleMouseOut(row._index)
                          },
                          click: function($event) {
                            _vm.clickCurrentRow(row._index)
                          },
                          dblclick: function($event) {
                            $event.stopPropagation()
                            _vm.dblclickCurrentRow(row._index)
                          }
                        }
                      },
                      _vm._l(_vm.columns, function(column) {
                        return _c(
                          "td",
                          { class: _vm.alignCls(column, row) },
                          [
                            _c("Cell", {
                              key: column._columnKey,
                              attrs: {
                                fixed: _vm.fixed,
                                "prefix-cls": _vm.prefixCls,
                                row: row,
                                column: column,
                                "natural-index": index,
                                index: row._index,
                                enableEdit: _vm.enableEdit,
                                checked: _vm.rowChecked(row._index),
                                disabled: _vm.rowDisabled(row._index),
                                expanded: _vm.rowExpanded(row._index)
                              }
                            })
                          ],
                          1
                        )
                      })
                    ),
                    _vm._v(" "),
                    _vm.rowExpanded(row._index) && !_vm.draggable
                      ? [
                          _c("transition", { attrs: { name: "fade" } }, [
                            _c(
                              "tr",
                              {
                                class: ((_obj = {}),
                                (_obj[_vm.prefixCls + "-expanded-hidden"] =
                                  _vm.fixed),
                                _obj)
                              },
                              [
                                _c(
                                  "td",
                                  {
                                    class: _vm.prefixCls + "-expanded-cell",
                                    attrs: { colspan: _vm.columns.length }
                                  },
                                  [
                                    _c("Expand", {
                                      key: row._rowKey,
                                      attrs: {
                                        row: row,
                                        render: _vm.expandRender,
                                        index: row._index
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            )
                          ])
                        ]
                      : _vm._e()
                  ]
                  var _obj
                })
              ],
              2
            )
          ]
        : [
            _c(
              "draggable",
              {
                ref: "dragbody",
                class: [_vm.prefixCls + "-tbody"],
                attrs: { element: "tbody", options: _vm.options },
                on: { start: _vm.draggableStart, end: _vm.draggableEnd },
                model: {
                  value: _vm.cloneData,
                  callback: function($$v) {
                    _vm.cloneData = $$v
                  },
                  expression: "cloneData"
                }
              },
              [
                _vm._l(_vm.cloneData, function(row, index) {
                  return [
                    _c(
                      "tr",
                      {
                        class: _vm.rowClasses(row._index),
                        on: {
                          mouseenter: function($event) {
                            $event.stopPropagation()
                            _vm.handleMouseIn(row._index)
                          },
                          mouseleave: function($event) {
                            $event.stopPropagation()
                            _vm.handleMouseOut(row._index)
                          },
                          click: function($event) {
                            _vm.clickCurrentRow(row._index)
                          },
                          dblclick: function($event) {
                            $event.stopPropagation()
                            _vm.dblclickCurrentRow(row._index)
                          }
                        }
                      },
                      _vm._l(_vm.columns, function(column) {
                        return _c(
                          "td",
                          { class: _vm.alignCls(column, row) },
                          [
                            _c("Cell", {
                              key: column._columnKey,
                              attrs: {
                                fixed: _vm.fixed,
                                "prefix-cls": _vm.prefixCls,
                                row: row,
                                column: column,
                                "natural-index": index,
                                index: row._index,
                                enableEdit: _vm.enableEdit,
                                checked: _vm.rowChecked(row._index),
                                disabled: _vm.rowDisabled(row._index),
                                expanded: _vm.rowExpanded(row._index)
                              }
                            })
                          ],
                          1
                        )
                      })
                    )
                  ]
                })
              ],
              2
            )
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-dc1af900", esExports)
  }
}

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_page_vue__ = __webpack_require__(37);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5fb06ded_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_page_vue__ = __webpack_require__(87);
var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_page_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5fb06ded_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_page_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\table\\table-page.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5fb06ded", Component.options)
  } else {
    hotAPI.reload("data-v-5fb06ded", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: [_vm.prefixCls + "-page-container"] }, [
    _c("div", { class: [_vm.prefixCls + "-pagebox"] }, [
      _c("i", {
        class: [
          "gf-icon",
          "icon-ios-arrow-back",
          _vm.prefixCls + "-goIcon",
          _vm.currentPage < 2 ? _vm.prefixCls + "-disable" : ""
        ],
        on: {
          click: function($event) {
            _vm.goPage(_vm.currentPage - 1)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "a",
        {
          class: _vm.currentClass(_vm.firstNum),
          attrs: { href: "javascript:;" },
          on: {
            click: function($event) {
              _vm.goPage(_vm.firstNum)
            }
          }
        },
        [_vm._v(_vm._s(_vm.firstNum))]
      ),
      _vm._v(" "),
      _vm.showPointsFront ? _c("span", [_vm._v("...")]) : _vm._e(),
      _vm._v(" "),
      _vm.totalPage > 1
        ? _c(
            "a",
            {
              class: _vm.currentClass(_vm.secondNum),
              attrs: { href: "javascript:;" },
              on: {
                click: function($event) {
                  _vm.goPage(_vm.secondNum)
                }
              }
            },
            [_vm._v(_vm._s(_vm.secondNum))]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.totalPage > 2
        ? _c(
            "a",
            {
              class: _vm.currentClass(_vm.secondNum + 1),
              attrs: { href: "javascript:;" },
              on: {
                click: function($event) {
                  _vm.goPage(_vm.secondNum + 1)
                }
              }
            },
            [_vm._v(_vm._s(_vm.secondNum + 1))]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.totalPage > 3
        ? _c(
            "a",
            {
              class: _vm.currentClass(_vm.secondNum + 2),
              attrs: { href: "javascript:;" },
              on: {
                click: function($event) {
                  _vm.goPage(_vm.secondNum + 2)
                }
              }
            },
            [_vm._v(_vm._s(_vm.secondNum + 2))]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showPointsEnd ? _c("span", [_vm._v("...")]) : _vm._e(),
      _vm._v(" "),
      _vm.totalPage >= _vm.showNumber
        ? _c(
            "a",
            {
              class: _vm.currentClass(_vm.lastNum),
              attrs: { href: "javascript:;" },
              on: {
                click: function($event) {
                  _vm.goPage(_vm.lastNum)
                }
              }
            },
            [_vm._v(_vm._s(_vm.lastNum))]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("i", {
        class: [
          "gf-icon",
          "icon-ios-arrow-forward",
          _vm.prefixCls + "-goIcon",
          _vm.currentPage == _vm.totalPage ? _vm.prefixCls + "-disable" : ""
        ],
        on: {
          click: function($event) {
            _vm.goPage(_vm.currentPage + 1)
          }
        }
      }),
      _vm._v(" "),
      _c("span", { class: [_vm.prefixCls + "-pageSkip"] }, [
        _vm._v("\n            到第\n            "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.skipPage,
              expression: "skipPage"
            }
          ],
          class: [_vm.prefixCls + "input"],
          attrs: { type: "text", min: "1" },
          domProps: { value: _vm.skipPage },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.skipPage = $event.target.value
            }
          }
        }),
        _vm._v("\n            页\n            "),
        _c(
          "button",
          {
            class: [_vm.prefixCls + "button"],
            attrs: { type: "button" },
            on: { click: _vm.jumpPage }
          },
          [_vm._v("确定")]
        )
      ]),
      _vm._v(" "),
      !_vm.isServerPage
        ? _c("span", { class: [_vm.prefixCls + "-count"] }, [
            _vm._v("共 " + _vm._s(_vm.totalItem) + " 条")
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5fb06ded", esExports)
  }
}

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "gf-table-container", style: _vm.styles },
    [
      _c("div", { class: _vm.classes }, [
        _c(
          "div",
          { ref: "header", staticClass: "gf-table-header" },
          [
            _c("table-head", {
              attrs: {
                "prefix-cls": _vm.prefixCls,
                styleObject: _vm.tableHeaderStyle,
                columns: _vm.cloneColumns,
                columnsRow: _vm.ColumnsRow,
                "columns-width": _vm.columnsWidth,
                data: _vm.currentTableData,
                "obj-data": _vm.objData
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _vm.currentTableData.length !== 0
          ? _c(
              "div",
              {
                ref: "body",
                class: _vm.bodyClasses,
                style: _vm.bodyStyle,
                on: { scroll: _vm.handleBodyScroll }
              },
              [
                _c("table-body", {
                  ref: "tbody",
                  attrs: {
                    "prefix-cls": _vm.prefixCls,
                    styleObject: _vm.tableStyle,
                    columns: _vm.cloneColumns,
                    "columns-width": _vm.columnsWidth,
                    data: _vm.currentTableData,
                    "obj-data": _vm.objData,
                    draggable: _vm.draggable
                  },
                  on: { "drag-change-data-sort": _vm.dragChangeData }
                })
              ],
              1
            )
          : _c(
              "div",
              { class: [_vm.prefixCls + "-nodata"] },
              [
                _vm._t("nodata", [
                  _c("div", { class: [_vm.prefixCls + "-nodata-default"] }, [
                    _vm._v("\n                    暂无数据\n                ")
                  ])
                ])
              ],
              2
            ),
        _vm._v(" "),
        _vm.isLeftFixed
          ? _c(
              "div",
              { class: [_vm.prefixCls + "-fixed"], style: _vm.fixedTableStyle },
              [
                _c(
                  "div",
                  { class: _vm.fixedHeaderClasses },
                  [
                    _c("table-head", {
                      attrs: {
                        fixed: "left",
                        "prefix-cls": _vm.prefixCls,
                        styleObject: _vm.fixedTableStyle,
                        columns: _vm.leftFixedColumns,
                        columnsRow: _vm.ColumnsRow,
                        "fixed-column-rows": _vm.leftFixedColumnRows,
                        "obj-data": _vm.objData,
                        "columns-width": _vm.columnsWidth,
                        data: _vm.rebuildData
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    ref: "fixedBody",
                    class: [_vm.prefixCls + "-fixed-body"],
                    style: _vm.fixedBodyStyle,
                    on: {
                      mousewheel: _vm.handleFixedMousewheel,
                      DOMMouseScroll: _vm.handleFixedMousewheel
                    }
                  },
                  [
                    _c("table-body", {
                      attrs: {
                        fixed: "left",
                        "prefix-cls": _vm.prefixCls,
                        styleObject: _vm.fixedTableStyle,
                        columns: _vm.leftFixedColumns,
                        data: _vm.rebuildData,
                        "columns-width": _vm.columnsWidth,
                        "obj-data": _vm.objData,
                        draggable: _vm.draggable
                      },
                      on: { "drag-change-data-sort": _vm.dragChangeData }
                    })
                  ],
                  1
                )
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.isRightFixed
          ? _c(
              "div",
              {
                class: [_vm.prefixCls + "-fixed-right"],
                style: _vm.fixedRightTableStyle
              },
              [
                _c(
                  "div",
                  { class: _vm.fixedHeaderClasses },
                  [
                    _c("table-head", {
                      attrs: {
                        fixed: "right",
                        "prefix-cls": _vm.prefixCls,
                        styleObject: _vm.fixedRightTableStyle,
                        columns: _vm.rightFixedColumns,
                        columnsRow: _vm.ColumnsRow,
                        "fixed-column-rows": _vm.rightFixedColumnRows,
                        "obj-data": _vm.objData,
                        "columns-width": _vm.columnsWidth,
                        data: _vm.rebuildData
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    ref: "fixedRightBody",
                    class: [_vm.prefixCls + "-fixed-body"],
                    style: _vm.fixedBodyStyle,
                    on: {
                      mousewheel: _vm.handleFixedMousewheel,
                      DOMMouseScroll: _vm.handleFixedMousewheel
                    }
                  },
                  [
                    _c("table-body", {
                      attrs: {
                        fixed: "right",
                        "prefix-cls": _vm.prefixCls,
                        styleObject: _vm.fixedRightTableStyle,
                        columns: _vm.rightFixedColumns,
                        data: _vm.rebuildData,
                        "columns-width": _vm.columnsWidth,
                        "obj-data": _vm.objData,
                        draggable: _vm.draggable
                      },
                      on: { "drag-change-data-sort": _vm.dragChangeData }
                    })
                  ],
                  1
                )
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.isRightFixed
          ? _c("div", {
              class: [_vm.prefixCls + "-fixed-right-header"],
              style: _vm.fixedRightHeaderStyle
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showPage
          ? _c(
              "div",
              { ref: "page", class: [_vm.prefixCls + "-page"] },
              [
                _c("table-page", {
                  attrs: {
                    "prefix-cls": _vm.prefixCls,
                    pageSize: _vm.pageData.pageSize,
                    currentPage: _vm.pageData.currentPage,
                    totalPage: _vm.pageData.totalPage,
                    totalItem: this.rebuildData.length,
                    isServerPage: _vm.isServerPage
                  },
                  on: { onChangePage: _vm.changePage }
                })
              ],
              1
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade" } }, [
        _vm.loading
          ? _c(
              "div",
              { class: [_vm.prefixCls + "-loading"] },
              [
                _vm._t("loading", [
                  _c("div", { staticClass: "gf-spin-main" }, [
                    _c("i", {
                      staticClass: "spin-icon-load gf-icon icon-load-c",
                      staticStyle: { "font-size": "18px" }
                    }),
                    _vm._v(" "),
                    _c("div", [_vm._v("Loading")])
                  ])
                ])
              ],
              2
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4a831c42", esExports)
  }
}

/***/ })
/******/ ]);
});