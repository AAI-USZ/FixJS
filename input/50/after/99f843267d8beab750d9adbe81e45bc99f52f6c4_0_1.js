function() {
        var value = this.card % 13;
        if (value > 10 || value == 0) {
            return 10;
        }
        else if (value == 1) {
            return 11;
        }
        return value;
    }