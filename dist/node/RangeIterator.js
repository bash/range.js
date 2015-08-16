/**
 * (c) 2015 Ruben Schmidmeister
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsJs = require('./utils.js');

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
        this.iterations = Math.floor(((0, _utilsJs.getNumericValue)(range.end) - (0, _utilsJs.getNumericValue)(range.start)) / range.step) + 1;

        /**
         * The amount of iterations
         *
         * @type {number}
         */
        this.counter = 0;

        if (this.iterations === Infinity && range.limit === Infinity) {
            throw new Error('infinite loop detected');
        }
    }

    /**
     *
     * @returns {{done: boolean, value: *}}
     */

    _createClass(RangeIterator, [{
        key: 'next',
        value: function next() {
            var ret = {
                done: this.iterations === 0 || this.counter === this.range.limit,
                value: this.current
            };

            if (!ret.done) {
                this.current = this._getNext();
                this.counter++;
                this.iterations--;
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
            var numeric = (0, _utilsJs.getNumericValue)(this.current) + this.range.step;

            return String.fromCharCode(numeric);
        }
    }]);

    return RangeIterator;
})();

exports.RangeIterator = RangeIterator;