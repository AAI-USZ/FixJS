function() {
	expect( 9 );

	var shouldCreate = false;

	$.widget( "ui.testWidget", {
		getterSetterVal: 5,
		_create: function() {
			ok( shouldCreate, "create called on instantiation" );
		},
		methodWithParams: function( param1, param2 ) {
			ok( true, "method called dirctly" );
			equal( param1, "value1", "parameter passed via direct call" );
			equal( param2, "value2", "multiple parameters passed via direct call" );

			return this;
		},
		getterSetterMethod: function( val ) {
			if ( val ) {
				this.getterSetterVal = val;
			} else {
				return this.getterSetterVal;
			}
		}
	});

	var elem = $( "<div>" )[ 0 ];

	shouldCreate = true;
	var instance = new $.ui.testWidget( {}, elem );
	shouldCreate = false;

	equal( $( elem ).data( "testWidget" ), instance,
		"instance stored in .data(pluginName)" );
	equal( instance.element[ 0 ], elem, "element stored on widget" );

	var ret = instance.methodWithParams( "value1", "value2" );
	equal( ret, instance, "plugin returned from method call" );

	ret = instance.getterSetterMethod();
	equal( ret, 5, "getter/setter can act as getter" );
	instance.getterSetterMethod( 30 );
	equal( instance.getterSetterVal, 30, "getter/setter can act as setter" );
}