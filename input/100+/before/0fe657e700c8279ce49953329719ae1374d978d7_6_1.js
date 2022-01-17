function() {
	expect( 20 + ( jQuery.fn.serialize ? 6 : 0 ) );

	document.getElementById("text1").value = "bla";
	equal( jQuery("#text1").val(), "bla", "Check for modified value of input element" );

	QUnit.reset();

	equal( jQuery("#text1").val(), "Test", "Check for value of input element" );
	// ticket #1714 this caused a JS error in IE
	equal( jQuery("#first").val(), "", "Check a paragraph element to see if it has a value" );
	ok( jQuery([]).val() === undefined, "Check an empty jQuery object will return undefined from val" );

	equal( jQuery("#select2").val(), "3", "Call val() on a single=\"single\" select" );

	deepEqual( jQuery("#select3").val(), ["1", "2"], "Call val() on a multiple=\"multiple\" select" );

	equal( jQuery("#option3c").val(), "2", "Call val() on a option element with value" );

	equal( jQuery("#option3a").val(), "", "Call val() on a option element with empty value" );

	equal( jQuery("#option3e").val(), "no value", "Call val() on a option element with no value attribute" );

	equal( jQuery("#option3a").val(), "", "Call val() on a option element with no value attribute" );

	jQuery("#select3").val("");
	deepEqual( jQuery("#select3").val(), [""], "Call val() on a multiple=\"multiple\" select" );

	deepEqual( jQuery("#select4").val(), [], "Call val() on multiple=\"multiple\" select with all disabled options" );

	jQuery("#select4 optgroup").add("#select4 > [disabled]").attr("disabled", false);
	deepEqual( jQuery("#select4").val(), ["2", "3"], "Call val() on multiple=\"multiple\" select with some disabled options" );

	jQuery("#select4").attr("disabled", true);
	deepEqual( jQuery("#select4").val(), ["2", "3"], "Call val() on disabled multiple=\"multiple\" select" );

	equal( jQuery("#select5").val(), "3", "Check value on ambiguous select." );

	jQuery("#select5").val(1);
	equal( jQuery("#select5").val(), "1", "Check value on ambiguous select." );

	jQuery("#select5").val(3);
	equal( jQuery("#select5").val(), "3", "Check value on ambiguous select." );

	if ( jQuery.fn.serialize ) {
		var checks = jQuery("<input type='checkbox' name='test' value='1'/><input type='checkbox' name='test' value='2'/><input type='checkbox' name='test' value=''/><input type='checkbox' name='test'/>").appendTo("#form");

		deepEqual( checks.serialize(), "", "Get unchecked values." );

		equal( checks.eq(3).val(), "on", "Make sure a value of 'on' is provided if none is specified." );

		checks.val([ "2" ]);
		deepEqual( checks.serialize(), "test=2", "Get a single checked value." );

		checks.val([ "1", "" ]);
		deepEqual( checks.serialize(), "test=1&test=", "Get multiple checked values." );

		checks.val([ "", "2" ]);
		deepEqual( checks.serialize(), "test=2&test=", "Get multiple checked values." );

		checks.val([ "1", "on" ]);
		deepEqual( checks.serialize(), "test=1&test=on", "Get multiple checked values." );

		checks.remove();
	}

	var $button = jQuery("<button value='foobar'>text</button>").insertAfter("#button");
	equal( $button.val(), "foobar", "Value retrieval on a button does not return innerHTML" );
	equal( $button.val("baz").html(), "text", "Setting the value does not change innerHTML" );

	equal( jQuery("<option/>").val("test").attr("value"), "test", "Setting value sets the value attribute" );
}