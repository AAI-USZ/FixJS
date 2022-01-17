function (p, x) {
            x = (x && x[0]) || 1.618;
            return Math.pow(p, 2) * ((x + 1) * p - x);
        }