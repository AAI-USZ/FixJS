function deepOption( from, to, msg ) {
		div.data( "ui-testWidget" ).options.foo = from;
		$.ui.testWidget.prototype._setOption = function( key, value ) {
			deepEqual( key, "foo", msg + ": key" );
			deepEqual( value, to, msg + ": value" );
		};
	}