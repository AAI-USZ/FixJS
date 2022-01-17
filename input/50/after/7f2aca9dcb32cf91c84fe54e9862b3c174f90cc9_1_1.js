function(message) {
        /**
         * 'RuntimeError' indicating that this exception was thrown due to a runtime error.
         * @type String
         * @constant
         */
        this.name = 'RuntimeError';

        /**
         * The explanation for why this exception was thrown.
         * @type String
         * @constant
         */
        this.message = message;

        /**
         * The Error object containing the stack trace.
         * @type Error
         * @constant
         *
         * @see <a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error'>Error object on Mozilla Developer Network</a>.
         */
        this.error = new Error();
    }