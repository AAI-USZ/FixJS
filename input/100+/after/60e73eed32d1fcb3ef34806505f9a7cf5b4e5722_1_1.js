function () {
        var totals = [0, 1, 3, 5, 6, 9];

        equal($Index._bsearch.call(totals, 4), 2, "Position of 4 (nearest hit)");
        equal($Index._bsearch.call(totals, 6), 4, "Position of 6 (exact hit)");
        equal($Index._bsearch.call(totals, 0), 0, "Position of 1 (low extreme)");
        equal($Index._bsearch.call(totals, 9), 5, "Position of 9 (high extreme)");
        equal($Index._bsearch.call(totals, -4), 0, "Position of -4 (out of bounds -)");
        equal($Index._bsearch.call(totals, 100), 5, "Position of 100 (out of bounds +)");
    }