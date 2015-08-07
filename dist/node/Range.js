/**
 * (c) 2015 Ruben Schmidmeister
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.range = range;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _RangeIteratorJs = require('./RangeIterator.js');

var _utilsJs = require('./utils.js');

/**
 *
 * @param {Number, String} start
 * @param {Number, String} end
 * @param {Number} step
 */

function range(start, end) {
    var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    return new Range(start, end, step);
}

exports['default'] = range;

var Range = (function () {
    /**
     *
     * @param {Number, String} start
     * @param {Number, String} end
     * @param {Number} step
     */

    function Range(start, end) {
        var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

        _classCallCheck(this, Range);

        var numericStart = (0, _utilsJs.getNumericValue)(start),
            numericEnd = (0, _utilsJs.getNumericValue)(end);

        // Reverse Range
        if (numericEnd < numericStart) {
            step = -step;
        }

        /**
         *
         * @type {Number|String}
         */
        this.start = start;

        /**
         *
         * @type {Number|String}
         */
        this.end = end;

        /**
         *
         * @type {Number}
         */
        this.step = step;
    }

    /**
     *
     * @param {Number} step
     */

    _createClass(Range, [{
        key: '_clear',

        /**
         *
         * @private
         */
        value: function _clear() {
            this._array = null;
            this._set = null;
        }

        /**
         *
         * @returns {RangeIterator}
         */
    }, {
        key: Symbol.iterator,
        value: function value() {
            return new _RangeIteratorJs.RangeIterator(this);
        }

        /**
         *
         * @returns {Number|String}
         */
    }, {
        key: 'last',
        value: function last() {
            return this.end;
        }

        /**
         *
         * @returns {Number|String}
         */
    }, {
        key: 'first',
        value: function first() {
            return this.start;
        }

        /**
         *
         * @param {Function} callbackFn
         * @param {Object} thisArg
         */
    }, {
        key: 'forEach',
        value: function forEach(callbackFn, thisArg) {
            var target = this._set || this._array || this;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = target[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    callbackFn.call(thisArg, item, item);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         *
         * @returns {number}
         */
    }, {
        key: 'count',
        value: function count() {
            var count = 0;

            this.forEach(function () {
                count++;
            });

            return count;
        }

        /**
         *
         * @returns {Array}
         */
    }, {
        key: 'toArray',
        value: function toArray() {
            if (this._array !== null) {
                return this._array;
            }

            return this._array = [].concat(_toConsumableArray(this));
        }

        /**
         *
         * @returns {Set}
         */
    }, {
        key: 'toSet',
        value: function toSet() {
            if (this._set !== null) {
                return this._set;
            }

            return this._set = new Set(this);
        }
    }, {
        key: 'step',
        set: function set(step) {
            if (!Number.isInteger(step)) {
                throw new TypeError('Step must be an integer');
            }

            this._step = step;
            this._clear();
        },

        /**
         *
         * @returns {Number}
         */
        get: function get() {
            return this._step;
        }

        /**
         *
         * @param {Number|String} start
         */
    }, {
        key: 'start',
        set: function set(start) {
            this._start = start;
            this._clear();
        },

        /**
         *
         * @returns {Number|String}
         */
        get: function get() {
            return this._start;
        }

        /**
         *
         * @param {Number|String} end
         */
    }, {
        key: 'end',
        set: function set(end) {
            this._end = end;
            this._clear();
        },

        /**
         *
         * @returns {Number|String}
         */
        get: function get() {
            return this._end;
        }
    }]);

    return Range;
})();

exports.Range = Range;