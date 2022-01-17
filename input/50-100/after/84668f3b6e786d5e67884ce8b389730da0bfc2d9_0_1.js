function(size) {
        var a = size.x, b = size.y;
        var remander = 0;
        while (b !== 0) {
            remainder = a % b;
            a = b;
            b = remainder;
        }
        return Math.abs(a);
    }