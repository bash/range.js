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
exports.getNumericValue = getNumericValue;

function getNumericValue(subject) {
    if (typeof subject === 'string') {
        return subject.charCodeAt(0);
    } else {
        return subject;
    }
}