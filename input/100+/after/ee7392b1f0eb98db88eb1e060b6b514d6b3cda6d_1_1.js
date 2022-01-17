function () {
        var buffer = [0, 1, 3, 5, 6, 9];

        equal(Index._bsearch.call(buffer, 4), 2, "Position of 4 (nearest hit)");
        equal(Index._bsearch.call(buffer, 6), 4, "Position of 6 (exact hit)");
        equal(Index._bsearch.call(buffer, 0), 0, "Position of 1 (low extreme)");
        equal(Index._bsearch.call(buffer, 9), 5, "Position of 9 (high extreme)");
        equal(Index._bsearch.call(buffer, -4), 0, "Position of -4 (out of bounds -)");
        equal(Index._bsearch.call(buffer, 100), 5, "Position of 100 (out of bounds +)");

        // extreme case, only 1 element
        buffer = [4];
        equal(Index._bsearch.call(buffer, 4), 0, "Position of 4 in 1-elem buffer (exact hit)");
        equal(Index._bsearch.call(buffer, -4), 0, "Position of -4 in 1-elem buffer (out of bounds -)");
        equal(Index._bsearch.call(buffer, 100), 0, "Position of 100 in 1-elem buffer (out of bounds +)");

        // extreme case, zero elements
        buffer = [];
        equal(Index._bsearch.call(buffer, 4), 0, "Position of 4 in empty");
    }