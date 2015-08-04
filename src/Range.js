/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 * Returns the number value or the charCode of the first char.
 *
 * @param {string|Number} subject
 */
let getNumericValue = function(subject) {
    if (typeof subject === 'string') {
        return subject.charCodeAt(0);
    } else {
        return subject;
    }
};

class RangeIterator {
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
    }

    /**
     *
     * @returns {{done: boolean, value: *}}
     */
    next() {
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

export class Range {
    /**
     *
     * @param {Number, String} start
     * @param {Number, String} end
     * @param {Number} step
     */
    constructor(start, end, step = 1) {
        if (!Number.isInteger(step)) {
            throw new TypeError('Step must be an integer');
        }

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
        for (let item of this) {
            callbackFn.call(thisArg, item, item);
        }
    }

    /**
     *
     * @returns {number}
     */
    count() {
        var count = 0;

        for (let item of this) {
            count += 1;
        }

        return count;
    }

    /**
     *
     * @returns {Array}
     */
    toArray() {
        return [...this];
    }

    /**
     *
     * @returns {Set}
     */
    toSet() {
        return new Set(this);
    }
}
