function (value, start, end) {
                start = start || 0;
                end = end || this.length - 1;

                var pos = Math.floor((start + end) / 2),
                    hit = this[pos];

                if (hit === value) {
                    // perfect hit
                    return pos;
                } else if (this[end] <= value) {
                    // end of range hit
                    return end;
                } else if (end - start === 1) {
                    // between two adjacent values
                    return start;
                } else if (hit > value) {
                    // narrowing range to lower half
                    return self._bsearch.call(this, value, start, pos);
                } else if (hit < value) {
                    // narrowing range to upper half
                    return self._bsearch.call(this, value, pos, end);
                }
            }