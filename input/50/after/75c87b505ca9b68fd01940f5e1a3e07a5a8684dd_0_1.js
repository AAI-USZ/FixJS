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

        try {
            var err = new Error();

            /**
             * Error object, containing a stack trace if provided by the JavaScript engine.
             * <br/><br/>
             * See also: {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error}
             *
             * @constant
             * @type Error
             */
            this.error = err;
        } catch (ex) {}
    }