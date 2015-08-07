/**
 * (c) 2015 Ruben Schmidmeister
 */

import range, { Range } from './Range.js';

if (typeof window === 'object') {
    window.IterateableRange = Range;
    window.range = range;
}