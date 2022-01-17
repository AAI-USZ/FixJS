function() {
	function CustomError( message ) {
		this.message = message;
	}

	CustomError.prototype.toString = function() {
		return this.message;
	};

	raises(
		function() {
			throw "error"
		}
	);

	raises(
		function() {
			throw "error"
		},
		'raises with just a message, no expected'
	);

	raises(
		function() {
			throw new CustomError();
		},
		CustomError,
		'raised error is an instance of CustomError'
	);

	raises(
		function() {
			throw new CustomError("some error description");
		},
		/description/,
		"raised error message contains 'description'"
	);

	raises(
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

	raises(
		function() {
			( window.execScript || function( data ) {
				window["eval"].call( window, data );
			})( "throw 'error'" );
		},
		'globally-executed errors caught'
	);

    this.CustomError = CustomError;

    raises(
        function() {
            throw new this.CustomError("some error description");
        },
        /description/,
        "raised error with 'this' context"
    );

}