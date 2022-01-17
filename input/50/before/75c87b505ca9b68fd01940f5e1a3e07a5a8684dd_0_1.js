function(message) {
        /**
         * 'DeveloperError' indicating that this exception was thrown due to a developer error.
         *
         * @constant
         * @type String
         */
        this.name = 'DeveloperError';

        /**
         * The explanation for why this exception was thrown.
         *
         * @type String
         */
        this.message = message;
    }