function(s1) {
        var s0 = this;
        var ranges = s0.ranges().concat(s1.ranges()).sort(rangeOrder);
        var oranges = [];
        var current = ranges[0];

        for (var i = 1; i < ranges.length; ++i) {
            var nxt = ranges[i];
            if (nxt.min() > (current.max() + 1)) {
                oranges.push(current);
                current = nxt;
            } else {
                if (nxt.max() > current.max()) {
                    current = new Range(current.min(), nxt.max());
                }
            }
        }
        oranges.push(current);

        if (oranges.length == 1) {
            return oranges[0];
        } else {
            return new _Compound(oranges);
        }
    }