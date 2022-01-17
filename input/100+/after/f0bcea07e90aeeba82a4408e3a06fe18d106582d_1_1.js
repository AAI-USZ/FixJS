function() {
	expect(21);
	QUnit.reset();

	ok( Sizzle("*").length >= 30, "Select all" );
	var all = Sizzle("*"), good = true;
	for ( var i = 0; i < all.length; i++ ) {
		if ( all[i].nodeType == 8 ) {
			good = false;
		}
	}
	ok( good, "Select all elements, no comment nodes" );
	t( "Element Selector", "#qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );
	t( "Element Selector", "body", ["body"] );
	t( "Element Selector", "html", ["html"] );
	t( "Parent Element", "div p", ["firstp","ap","sndp","en","sap","first"] );
	equal( jQuery("param", "#object1").length, 2, "Object/param as context" );

	deepEqual( jQuery("p", document.getElementsByTagName("div")).get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );
	deepEqual( jQuery("p", "div").get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );
	deepEqual( jQuery("p", jQuery("div")).get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );
	deepEqual( jQuery("div").find("p").get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );

	deepEqual( jQuery("#form").find("select").get(), q("select1","select2","select3","select4","select5"), "Finding selects with a context." );

	ok( jQuery("#length").length, '&lt;input name="length"&gt; cannot be found under IE, see #945' );
	ok( jQuery("#lengthtest input").length, '&lt;input name="length"&gt; cannot be found under IE, see #945' );

	// Check for unique-ness and sort order
	deepEqual( jQuery("p, div p").get(), jQuery("p").get(), "Check for duplicates: p, div p" );

	t( "Checking sort order", "h2, h1", ["qunit-header", "qunit-banner", "qunit-userAgent"] );
	t( "Checking sort order", "h2:first, h1:first", ["qunit-header", "qunit-banner"] );
	t( "Checking sort order", "#qunit-fixture p, #qunit-fixture p a", ["firstp", "simon1", "ap", "google", "groups", "anchor1", "mark", "sndp", "en", "yahoo", "sap", "anchor2", "simon", "first"] );

	// Test Conflict ID
	deepEqual( jQuery("#lengthtest").find("#idTest").get(), q("idTest"), "Finding element with id of ID." );
	deepEqual( jQuery("#lengthtest").find("[name='id']").get(), q("idTest"), "Finding element with id of ID." );
	deepEqual( jQuery("#lengthtest").find("input[id='idTest']").get(), q("idTest"), "Finding elements with a context." );
}