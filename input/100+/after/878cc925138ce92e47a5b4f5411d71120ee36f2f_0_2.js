function( a, b ) {
        if( arguments.length < 2 ) {
            b = a;
            a = this;
        }

        if (a.min() < b.min()) {
            return -1;
        } else if (a.min() > b.min()) {
            return 1;
        } else if (a.max() < b.max()) {
            return -1;
        } else if (b.max() > a.max()) {
            return 1;
        } else {
            return 0;
        }
    }