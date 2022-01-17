function () {
        var index = $Index.create();
        index._totals = [0, 1, 3, 5, 6, 9];

        equal(index._bsearch(4), 2, "Position of 4 (nearest hit)");
        equal(index._bsearch(6), 4, "Position of 6 (exact hit)");
        equal(index._bsearch(0), 0, "Position of 1 (low extreme)");
        equal(index._bsearch(9), 5, "Position of 9 (high extreme)");
        equal(index._bsearch(10), 5, "Position of 10 (out of bounds)");
    }