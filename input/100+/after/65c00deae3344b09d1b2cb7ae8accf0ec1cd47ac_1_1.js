function() {
	function CustomError( message ) {
		this.message = message;
	}

	CustomError.prototype.toString = function() {
		return this.message;
	};

	throws(
		function() {
			throw "my error"
		}
	);

	throws(
		function() {
			throw "my error"
		},
		"simple string throw, no 'expected' value given"
	);

	throws(
		function() {
			throw new CustomError();
		},
		CustomError,
		'thrown error is an instance of CustomError'
	);

	throws(
		function() {
			throw new CustomError("some error description");
		},
		/description/,
		"use a regex to match against the stringified error"
	);

	throws(
		function() {
			throw new CustomError("some error description");
		},
		function( err ) {
			if ( (err instanceof CustomError) && /description/.test(err) ) {
				return true;
			}
		},
		"custom validation function"
	);

	throws(
		function() {
			( window.execScript || function( data ) {
				window["eval"].call( window, data );
			})( "throw 'error'" );
		},
		'globally-executed errors caught'
	);

    this.CustomError = CustomError;

    throws(
        function() {
            throw new this.CustomError("some error description");
        },
        /description/,
        "throw error from property of 'this' context"
    );

    raises(
        function() {
            throw "error"
        },
        "simple throw, asserting with deprecated raises() function"
    );

}