/**
 * (c) 2015 Ruben Schmidmeister
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _RangeJs = require('./Range.js');

var _RangeJs2 = _interopRequireDefault(_RangeJs);

if (typeof window === 'object') {
  window.IterateableRange = _RangeJs.Range;
  window.range = _RangeJs2['default'];
}