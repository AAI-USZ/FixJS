function(red, green, blue, alpha) {
        /**
         * The red component.
         */
        this.red = typeof red === 'undefined' ? 1.0 : red;
        /**
         * The green component.
         */
        this.green = typeof green === 'undefined' ? 1.0 : green;
        /**
         * The blue component.
         */
        this.blue = typeof blue === 'undefined' ? 1.0 : blue;
        /**
         * The alpha component.
         */
        this.alpha = typeof alpha === 'undefined' ? 1.0 : alpha;
    }