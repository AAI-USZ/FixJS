function(e /*, from*/) {
        var length = this.length;
        var from = Number(arguments[1]) || 0;

        if (from < 0) {
            from = Math.ceil(from) + length;
        } else {
            from = Math.floor(from);
        }

        for (; from < length; ++from) {
            if (from in this && this[from] === e) {
                return from;
            }
        }
        return -1;
    }