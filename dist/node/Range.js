/**
 * (c) 2015 Ruben Schmidmeister
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.range = range;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _RangeIteratorJs = require('./RangeIterator.js');

var _utilsJs = require('./utils.js');

/**
 *
 * @param {Number, String} start
 * @param {Number, String} end
 * @param {Number} step
 * @param {Number} limit
 */

function range(start, end) {
    var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var limit = arguments.length <= 3 || arguments[3] === undefined ? Infinity : arguments[3];

    return new Range(start, end, step, limit);
}

exports['default'] = range;

var Range = (function () {
    /**
     *
     * @param {Number, String} start
     * @param {Number, String} end
     * @param {Number} step
     * @param {Number} limit
     */

    function Range(start, end) {
        var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
        var limit = arguments.length <= 3 || arguments[3] === undefined ? Infinity : arguments[3];

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

        /**
         *
         * @type {Number}
         */
        this.limit = limit;
    }

    /**
     *
     * @param {number|string} start
     * @param {number|string} end
     * @param {number} step
     * @private
     */

    _createClass(Range, [{
        key: '_validateRange',
        value: function _validateRange(start, end, step) {
            start = (0, _utilsJs.getNumericValue)(start);
            end = (0, _utilsJs.getNumericValue)(end);

            // Prevent infinite loops
            if (start > end !== step < 0) {
                throw new Error('Impossible Range');
            }
        }

        /**
         *
         * @param {Number} limit
         */
    }, {
        key: Symbol.iterator,

        /**
         *
         * @returns {RangeIterator}
         */
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
            // Maybe use [...this] in the future
            var array = [];

            this.forEach(function (item) {
                array.push(item);
            });

            return array;
        }

        /**
         *
         * @returns {Set}
         */
    }, {
        key: 'toSet',
        value: function toSet() {
            return new Set(this);
        }
    }, {
        key: 'limit',
        set: function set(limit) {
            if (limit < 0 || !Number.isInteger(limit) && Number.isFinite(limit)) {
                throw new Error('the limit must be a positive integer or infinity');
            }

            this._limit = limit;
        },

        /**
         *
         * @returns {Number}
         */
        get: function get() {
            return this._limit;
        }

        /**
         *
         * @param {Number} step
         */
    }, {
        key: 'step',
        set: function set(step) {
            this._validateRange(this.start, this.end, step);

            if (!Number.isFinite(step)) {
                throw new Error('the step number must be finite');
            }

            this._step = step;
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
         * @param {number|string} start
         */
    }, {
        key: 'start',
        set: function set(start) {

            this._validateRange(start, this.end, this.step);

            if (!Number.isFinite((0, _utilsJs.getNumericValue)(start))) {
                throw new Error('only the end point may be infinite');
            }

            this._start = start;
        },

        /**
         *
         * @returns {number|string}
         */
        get: function get() {
            return this._start;
        }

        /**
         *
         * @param {number|string} end
         */
    }, {
        key: 'end',
        set: function set(end) {
            this._validateRange(this.start, end, this.step);

            this._end = end;
        },

        /**
         *
         * @returns {number|string}
         */
        get: function get() {
            return this._end;
        }
    }]);

    return Range;
})();

exports.Range = Range;