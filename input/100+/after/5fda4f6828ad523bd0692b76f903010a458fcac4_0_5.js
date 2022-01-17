function() {
	expect( 10 );
	var instance;
	$.widget( "ui.testWidget", {
		method: function( a, b ) {
			deepEqual( this, instance, "this is correct in testWidget" );
			deepEqual( a, 5, "parameter passed to testWidget" );
			deepEqual( b, 10, "second parameter passed to testWidget" );
			return a + b;
		}
	});

	$.widget( "ui.testWidget2", $.ui.testWidget, {
		method: function( a, b ) {
			deepEqual( this, instance, "this is correct in testWidget2" );
			deepEqual( a, 5, "parameter passed to testWidget2" );
			deepEqual( b, 10, "second parameter passed to testWidget2" );
			return this._superApply( arguments );
		}
	});

	$.widget( "ui.testWidget3", $.ui.testWidget2, {
		method: function( a, b ) {
			deepEqual( this, instance, "this is correct in testWidget3" );
			deepEqual( a, 5, "parameter passed to testWidget3" );
			deepEqual( b, 10, "second parameter passed to testWidget3" );
			var ret = this._superApply( arguments );
			deepEqual( ret, 15, "super returned value" );
		}
	});

	instance = $( "<div>" ).testWidget3().data( "ui-testWidget3" );
	instance.method( 5, 10 );
	delete $.ui.testWidget3;
	delete $.ui.testWidget2;
}