/**
 * (c) 2015 Ruben Schmidmeister
 */

import { getNumericValue } from './utils.js';

export class RangeIterator {
    /**
     *
     * @param {Range} range
     */
    constructor(range) {
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
    next() {
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
    _getNext() {
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
    _getNextNumber() {
        return this.current + this.range.step;
    }

    /**
     *
     * @returns {string}
     * @private
     */
    _getNextChar() {
        let numeric = getNumericValue(this.current) + this.range.step;

        return String.fromCharCode(numeric);
    }
}