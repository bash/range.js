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
 * @param {Number} limit
 */
export function range(start, end, step = 1, limit = Infinity) {
    return new Range(start, end, step, limit);
}

export default range;

export class Range {
    /**
     *
     * @param {Number, String} start
     * @param {Number, String} end
     * @param {Number} step
     * @param {Number} limit
     */
    constructor(start, end, step = 1, limit = Infinity) {
        let numericStart = getNumericValue(start),
            numericEnd = getNumericValue(end);

        // Reverse Range
        if (numericEnd < numericStart) {
            step = -step;
        }

		this._validateRange(start, end, step);

        /**
         *
         * @type {Number|String}
         */
        this._start = start;

        /**
         *
         * @type {Number|String}
         */
        this._end = end;

        /**
         *
         * @type {Number}
         */
        this._step = step;

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
    _validateRange(start, end, step) {
        start = getNumericValue(start);
        end = getNumericValue(end);

        // Prevent infinite loops
        if (start > end !== step < 0) {
            throw new Error('Impossible Range');
        }
    }

    /**
     *
     * @param {Number} limit
     */
    set limit(limit) {
        if (limit < 0 || (!Number.isInteger(limit) && Number.isFinite(limit))) {
            throw new Error('the limit must be a positive integer or infinity');
        }

        this._limit = limit;
    }

    /**
     *
     * @returns {Number}
     */
    get limit() {
        return this._limit;
    }

    /**
     *
     * @param {Number} step
     */
    set step(step) {
        this._validateRange(this.start, this.end, step);

        if (!Number.isFinite(step)) {
            throw new Error('the step number must be finite');
        }

        this._step = step;
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
     * @param {number|string} start
     */
    set start(start) {

        this._validateRange(start, this.end, this.step);

        if (!Number.isFinite(getNumericValue(start))) {
            throw new Error('only the end point may be infinite');
        }

        this._start = start;
    }

    /**
     *
     * @returns {number|string}
     */
    get start() {
        return this._start;
    }

    /**
     *
     * @param {number|string} end
     */
    set end(end) {
        this._validateRange(this.start, end, this.step);

        this._end = end;
    }

    /**
     *
     * @returns {number|string}
     */
    get end() {
        return this._end;
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

    includes(item) {
        return this.toArray().indexOf(item) !== -1;
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
        // Maybe use [...this] in the future
        let array = [];

        this.forEach(function (item) {
            array.push(item);
        });

        return array;
    }

    /**
     *
     * @returns {Set}
     */
    toSet() {
        return new Set(this);
    }
}
