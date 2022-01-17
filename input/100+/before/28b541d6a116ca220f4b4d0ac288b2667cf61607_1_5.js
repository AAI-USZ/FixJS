function() {
	expect( 23 );

	t( "Headers", ":header", ["qunit-header", "qunit-banner", "qunit-userAgent"] );
	t( "Headers(case-insensitive)", ":Header", ["qunit-header", "qunit-banner", "qunit-userAgent"] );
	t( "Has Children - :has()", "p:has(a)", ["firstp","ap","en","sap"] );
	ok( Sizzle("#qunit-fixture :not(:has(:has(*)))").length, "All not grandparents" );

	var select = document.getElementById("select1"),
		match = Sizzle.matchesSelector;
	ok( match( select, ":has(option)" ), "Has Option Matches" );

	t( "Text Contains", "a:contains(Google)", ["google","groups"] );
	t( "Text Contains", "a:contains(Google Groups)", ["groups"] );

	t( "Text Contains", "a:contains(Google Groups (Link))", ["groups"] );
	t( "Text Contains", "a:contains((Link))", ["groups"] );

	var tmp = document.createElement("div");
	tmp.id = "tmp_input";
	document.body.appendChild( tmp );

	jQuery.each( [ "button", "submit", "reset" ], function( i, type ) {
		jQuery( tmp ).append(
			"<input id='input_T' type='T'/><button id='button_T' type='T'>test</button>".replace(/T/g, type) );

		t( "Input Buttons :" + type, "#tmp_input :" + type, [ "input_" + type, "button_" + type ] );

		ok( match( Sizzle("#input_" + type)[0], ":" + type ), "Input Matches :" + type );
		ok( match( Sizzle("#button_" + type)[0], ":" + type ), "Button Matches :" + type );
	});

	document.body.removeChild( tmp );

	var input = document.createElement("input");
	input.type = "text";
	input.id = "focus-input";

	document.body.appendChild( input );
	input.focus();

	// Inputs can't be focused unless the document has focus
	if ( document.activeElement !== input || (document.hasFocus && !document.hasFocus()) ||
		(document.querySelectorAll && !document.querySelectorAll("input:focus").length) ) {
		ok( true, "The input was not focused. Skip checking the :focus match." );
		ok( true, "The input was not focused. Skip checking the :focus match." );

	} else {
		t( "Element focused", "input:focus", [ "focus-input" ] );
		ok( match( input, ":focus" ), ":focus Matches" );
	}

	// :active selector: this selector does not depend on document focus
	if ( document.activeElement === input ) {
		ok( match( input, ":active" ), ":active Matches" );
	} else {
		ok( true, "The input did not become active. Skip checking the :active match." );
	}

	input.blur();

	// When IE is out of focus, blur does not work. Force it here.
	if ( document.activeElement === input ) {
		document.body.focus();
	}

	ok( !match( input, ":focus" ), ":focus doesn't match" );
	ok( !match( input, ":active" ), ":active doesn't match" );
	document.body.removeChild( input );
}