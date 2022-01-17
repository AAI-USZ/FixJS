function() {
	expect( 35 );

	equal( Sizzle("").length, 0, "Empty selector returns an empty array" );
	equal( Sizzle(" ").length, 0, "Empty selector returns an empty array" );
	equal( Sizzle("\t").length, 0, "Empty selector returns an empty array" );
	var form = document.getElementById("form");
	ok( !Sizzle.matchesSelector( form, "" ), "Empty string passed to matchesSelector does not match" );

	ok( Sizzle("*").length >= 30, "Select all" );
	var all = Sizzle("*"), good = true;
	for ( var i = 0; i < all.length; i++ ) {
		if ( all[i].nodeType == 8 ) {
			good = false;
		}
	}
	ok( good, "Select all elements, no comment nodes" );
	t( "Element Selector", "html", ["html"] );
	t( "Element Selector", "body", ["body"] );
	t( "Element Selector", "#qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );

	t( "Leading space", " #qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );
	t( "Leading tab", "\t#qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );
	t( "Leading carriage return", "\r#qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );
	t( "Leading line feed", "\n#qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );
	t( "Leading form feed", "\f#qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );
	t( "Trailing space", "#qunit-fixture p ", ["firstp","ap","sndp","en","sap","first"] );
	t( "Trailing tab", "#qunit-fixture p\t", ["firstp","ap","sndp","en","sap","first"] );
	t( "Trailing carriage return", "#qunit-fixture p\r", ["firstp","ap","sndp","en","sap","first"] );
	t( "Trailing line feed", "#qunit-fixture p\n", ["firstp","ap","sndp","en","sap","first"] );
	t( "Trailing form feed", "#qunit-fixture p\f", ["firstp","ap","sndp","en","sap","first"] );

	t( "Parent Element", "div p", ["firstp","ap","sndp","en","sap","first"] );
	t( "Parent Element (non-space descendant combinator)", "div\tp", ["firstp","ap","sndp","en","sap","first"] );
	equal( Sizzle("param", document.getElementById("object1")).length, 2, "Object/param as context" );

	deepEqual( Sizzle("select", form), q("select1","select2","select3","select4","select5"), "Finding selects with a context." );

	// Check for unique-ness and sort order
	deepEqual( Sizzle("p, div p"), Sizzle("p"), "Check for duplicates: p, div p" );

	t( "Checking sort order", "h2, h1", ["qunit-header", "qunit-banner", "qunit-userAgent"] );
	t( "Checking sort order", "h2:first, h1:first", ["qunit-header", "qunit-banner"] );
	t( "Checking sort order", "#qunit-fixture p, #qunit-fixture p a", ["firstp", "simon1", "ap", "google", "groups", "anchor1", "mark", "sndp", "en", "yahoo", "sap", "anchor2", "simon", "first"] );

	// Test Conflict ID
	var lengthtest = document.getElementById("lengthtest");
	deepEqual( Sizzle("#idTest", lengthtest), q("idTest"), "Finding element with id of ID." );
	deepEqual( Sizzle("[name='id']", lengthtest), q("idTest"), "Finding element with id of ID." );
	deepEqual( Sizzle("input[id='idTest']", lengthtest), q("idTest"), "Finding elements with id of ID." );

	var siblingTest = document.getElementById("siblingTest");
	deepEqual( Sizzle("div em", siblingTest), [], "Element-rooted QSA does not select based on document context" );
	deepEqual( Sizzle("div em, div em, div em:not(div em)", siblingTest), [], "Element-rooted QSA does not select based on document context" );
	deepEqual( Sizzle("div em, em\\,", siblingTest), [], "Escaped commas do not get treated with an id in element-rooted QSA" );

	var html = "";
	for ( i = 0; i < 100; i++ ) {
		html = "<div>" + html + "</div>";
	}
	html = jQuery( html ).appendTo( document.body );
	ok( !!Sizzle("body div div div").length, "No stack or performance problems with large amounts of descendents" );
	ok( !!Sizzle("body>div div div").length, "No stack or performance problems with large amounts of descendents" );
	html.remove();
}