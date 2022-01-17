function() {
	expect( 15 );

	var shouldCreate = false;

	$.widget( "ui.testWidget", {
		getterSetterVal: 5,
		_create: function() {
			ok( shouldCreate, "create called on instantiation" );
		},
		methodWithParams: function( param1, param2 ) {
			ok( true, "method called via .pluginName(methodName)" );
			equal( param1, "value1",
				"parameter passed via .pluginName(methodName, param)" );
			equal( param2, "value2",
				"multiple parameters passed via .pluginName(methodName, param, param)" );

			return this;
		},
		getterSetterMethod: function( val ) {
			if ( val ) {
				this.getterSetterVal = val;
			} else {
				return this.getterSetterVal;
			}
		},
		jQueryObject: function() {
			return $( "body" );
		}
	});

	shouldCreate = true;
	var elem = $( "<div>" )
		.bind( "testwidgetcreate", function() {
			ok( shouldCreate, "create event triggered on instantiation" );
		})
		.testWidget();
	shouldCreate = false;

	var instance = elem.data( "ui-testWidget" );
	equal( typeof instance, "object", "instance stored in .data(pluginName)" );
	equal( instance.element[0], elem[0], "element stored on widget" );
	var ret = elem.testWidget( "methodWithParams", "value1", "value2" );
	equal( ret, elem, "jQuery object returned from method call" );

	// 1.9 BC for #7810
	// TODO remove
	var bcInstance = elem.data("testWidget");
	equal( typeof bcInstance, "object", "instance stored in .data(pluginName)" );
	equal( bcInstance.element[0], elem[0], "element stored on widget" );

	ret = elem.testWidget( "getterSetterMethod" );
	equal( ret, 5, "getter/setter can act as getter" );
	ret = elem.testWidget( "getterSetterMethod", 30 );
	equal( ret, elem, "getter/setter method can be chainable" );
	equal( instance.getterSetterVal, 30, "getter/setter can act as setter" );
	ret = elem.testWidget( "jQueryObject" );
	equal( ret[ 0 ], document.body, "returned jQuery object" );
	equal( ret.end(), elem, "stack preserved" );
}