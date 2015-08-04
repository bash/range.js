/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 * Returns the number value or the charCode of the first char.
 *
 * @param {string|Number} subject
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var getNumericValue = function getNumericValue(subject) {
    if (typeof subject === 'string') {
        return subject.charCodeAt(0);
    } else {
        return subject;
    }
};

var RangeIterator = (function () {
    /**
     *
     * @param {Range} range
     */

    function RangeIterator(range) {
        _classCallCheck(this, RangeIterator);

        /**
         *
         * @type {Range}
         */
        this.range = range;

        /**
         *
         * @type {Number|String}
         */
        this.current = range.start;

        /**
         * The number of remaining iterations
         *
         * @type {number}
         */
        this.iterations = Math.floor((getNumericValue(range.end) - getNumericValue(range.start)) / range.step) + 1;
    }

    /**
     *
     * @returns {{done: boolean, value: *}}
     */

    _createClass(RangeIterator, [{
        key: 'next',
        value: function next() {
            var ret = { done: this.iterations === 0, value: this.current };

            if (!ret.done) {
                this.iterations -= 1;
                this.current = this._getNext();
            }

            return ret;
        }

        /**
         *
         * @returns {string|number}
         * @private
         */
    }, {
        key: '_getNext',
        value: function _getNext() {
            if (typeof this.current === 'string') {
                return this._getNextChar();
            } else {
                return this._getNextNumber();
            }
        }

        /**
         *
         * @returns {number}
         * @private
         */
    }, {
        key: '_getNextNumber',
        value: function _getNextNumber() {
            return this.current + this.range.step;
        }

        /**
         *
         * @returns {string}
         * @private
         */
    }, {
        key: '_getNextChar',
        value: function _getNextChar() {
            var numeric = getNumericValue(this.current) + this.range.step;

            return String.fromCharCode(numeric);
        }
    }]);

    return RangeIterator;
})();

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

        if (!Number.isInteger(step)) {
            throw new TypeError('Step must be an integer');
        }

        var numericStart = getNumericValue(start),
            numericEnd = getNumericValue(end);

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
     * @returns {RangeIterator}
     */

    _createClass(Range, [{
        key: Symbol.iterator,
        value: function value() {
            return new RangeIterator(this);
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    count += 1;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return count;
        }

        /**
         *
         * @returns {Array}
         */
    }, {
        key: 'toArray',
        value: function toArray() {
            return [].concat(_toConsumableArray(this));
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
    }]);

    return Range;
})();

exports.Range = Range;