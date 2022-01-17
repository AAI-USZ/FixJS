function(val, base, round, multiply) {
        // Convert a number up
        if (multiply) {
            var total = val * base;
        // Convert down
        } else {
            var total = val / base;
        }
        
        return total.toFixed(round);
    }