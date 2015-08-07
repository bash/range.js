/**
 * (c) 2015 Ruben Schmidmeister
 */

import { RangeIterator } from './RangeIterator.js';
import { getNumericValue } from './utils.js';

/**
 *
 * @param {Number, String} start
 * @param {Number, String} end
 * @param {Number} step
 */
export function range(start, end, step = 1) {
    return new Range(start, end, step);
}

export default range;

export class Range {
    /**
     *
     * @param {Number, String} start
     * @param {Number, String} end
     * @param {Number} step
     */
    constructor(start, end, step = 1) {
        let numericStart = getNumericValue(start),
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
     * @param {Number} step
     */
    set step(step) {
        if (!Number.isInteger(step)) {
            throw new TypeError('Step must be an integer');
        }

        this._step = step;
        this._clear();
    }

    /**
     *
     * @returns {Number}
     */
    get step() {
        return this._step;
    }

    /**
     *
     * @param {Number|String} start
     */
    set start(start) {
        this._start = start;
        this._clear();
    }

    /**
     *
     * @returns {Number|String}
     */
    get start() {
        return this._start;
    }

    /**
     *
     * @param {Number|String} end
     */
    set end(end) {
        this._end = end;
        this._clear();
    }

    /**
     *
     * @returns {Number|String}
     */
    get end() {
        return this._end;
    }

    /**
     *
     * @private
     */
    _clear() {
        this._array = null;
        this._set = null;
    }

    /**
     *
     * @returns {RangeIterator}
     */
    [Symbol.iterator]() {
        return new RangeIterator(this);
    }

    /**
     *
     * @returns {Number|String}
     */
    last() {
        return this.end;
    }

    /**
     *
     * @returns {Number|String}
     */
    first() {
        return this.start;
    }

    /**
     *
     * @param {Function} callbackFn
     * @param {Object} thisArg
     */
    forEach(callbackFn, thisArg) {
        let target = this._set || this._array || this;

        for (let item of target) {
            callbackFn.call(thisArg, item, item);
        }
    }

    /**
     *
     * @returns {number}
     */
    count() {
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
    toArray() {
        if (this._array !== null) {
            return this._array;
        }

        return (this._array = [...this]);
    }

    /**
     *
     * @returns {Set}
     */
    toSet() {
        if (this._set !== null) {
            return this._set;
        }

        return (this._set = new Set(this));
    }
}
