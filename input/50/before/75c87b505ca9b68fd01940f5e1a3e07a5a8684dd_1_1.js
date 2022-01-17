function(message) {
        /**
         * 'RuntimeError' indicating that this exception was thrown due to a runtime error.
         *
         * @constant
         * @type String
         */
        this.name = 'RuntimeError';

        /**
         * The explanation for why this exception was thrown.
         *
         * @type String
         */
        this.message = message;
    }