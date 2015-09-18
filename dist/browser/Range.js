(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),_utilsJs=require("./utils.js"),RangeIterator=function(){function t(e){if(_classCallCheck(this,t),this.range=e,this.current=e.start,this.iterations=Math.floor((_utilsJs.getNumericValue(e.end)-_utilsJs.getNumericValue(e.start))/e.step)+1,this.counter=0,this.iterations===1/0&&e.limit===1/0)throw new Error("infinite loop detected")}return _createClass(t,[{key:"next",value:function(){var t={done:0===this.iterations||this.counter===this.range.limit,value:this.current};return t.done||(this.current=this._getNext(),this.counter++,this.iterations--),t}},{key:"_getNext",value:function(){return"string"==typeof this.current?this._getNextChar():this._getNextNumber()}},{key:"_getNextNumber",value:function(){return this.current+this.range.step}},{key:"_getNextChar",value:function(){var t=_utilsJs.getNumericValue(this.current)+this.range.step;return String.fromCharCode(t)}}]),t}();exports.RangeIterator=RangeIterator;


},{"./utils.js":3}],2:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function range(t,e){var n=arguments.length<=2||void 0===arguments[2]?1:arguments[2],r=arguments.length<=3||void 0===arguments[3]?1/0:arguments[3];return new Range(t,e,n,r)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();exports.range=range;var _RangeIteratorJs=require("./RangeIterator.js"),_utilsJs=require("./utils.js");exports["default"]=range;var Range=function(){function t(e,n){var r=arguments.length<=2||void 0===arguments[2]?1:arguments[2],i=arguments.length<=3||void 0===arguments[3]?1/0:arguments[3];_classCallCheck(this,t);var a=_utilsJs.getNumericValue(e),s=_utilsJs.getNumericValue(n);a>s&&(r=-r),this._validateRange(e,n,r),this._start=e,this._end=n,this._step=r,this.limit=i}return _createClass(t,[{key:"_validateRange",value:function(t,e,n){if(t=_utilsJs.getNumericValue(t),e=_utilsJs.getNumericValue(e),t>e!=0>n)throw new Error("Impossible Range")}},{key:Symbol.iterator,value:function(){return new _RangeIteratorJs.RangeIterator(this)}},{key:"last",value:function(){return this.end}},{key:"first",value:function(){return this.start}},{key:"forEach",value:function(t,e){var n=this._set||this._array||this,r=!0,i=!1,a=void 0;try{for(var s,u=n[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){var o=s.value;t.call(e,o,o)}}catch(l){i=!0,a=l}finally{try{!r&&u["return"]&&u["return"]()}finally{if(i)throw a}}}},{key:"includes",value:function(t){var e=_utilsJs.getNumericValue(t);return e>this.end?!1:e<this.start?!1:-1!==this.toArray().indexOf(t)}},{key:"count",value:function e(){var e=0;return this.forEach(function(){e++}),e}},{key:"toArray",value:function(){var t=[];return this.forEach(function(e){t.push(e)}),t}},{key:"toSet",value:function(){return new Set(this)}},{key:"limit",set:function(t){if(0>t||!Number.isInteger(t)&&Number.isFinite(t))throw new Error("the limit must be a positive integer or infinity");this._limit=t},get:function(){return this._limit}},{key:"step",set:function(t){if(this._validateRange(this.start,this.end,t),!Number.isFinite(t))throw new Error("the step number must be finite");this._step=t},get:function(){return this._step}},{key:"start",set:function(t){if(this._validateRange(t,this.end,this.step),!Number.isFinite(_utilsJs.getNumericValue(t)))throw new Error("only the end point may be infinite");this._start=t},get:function(){return this._start}},{key:"end",set:function(t){this._validateRange(this.start,t,this.step),this._end=t},get:function(){return this._end}}]),t}();exports.Range=Range;


},{"./RangeIterator.js":1,"./utils.js":3}],3:[function(require,module,exports){
"use strict";function getNumericValue(e){return"string"==typeof e?e.charCodeAt(0):e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNumericValue=getNumericValue;


},{}]},{},[2])