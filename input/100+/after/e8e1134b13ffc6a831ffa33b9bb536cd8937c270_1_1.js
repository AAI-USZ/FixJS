function() {
	expect( 54 );

	t( "Attribute Exists", "#qunit-fixture a[title]", ["google"] );
	t( "Attribute Exists (case-insensitive)", "#qunit-fixture a[TITLE]", ["google"] );
	t( "Attribute Exists", "#qunit-fixture *[title]", ["google"] );
	t( "Attribute Exists", "#qunit-fixture [title]", ["google"] );
	t( "Attribute Exists", "#qunit-fixture a[ title ]", ["google"] );

	t( "Boolean attribute exists", "#select2 option[selected]", ["option2d"]);
	t( "Boolean attribute equals", "#select2 option[selected='selected']", ["option2d"]);

	t( "Attribute Equals", "#qunit-fixture a[rel='bookmark']", ["simon1"] );
	t( "Attribute Equals", "#qunit-fixture a[rel='bookmark']", ["simon1"] );
	t( "Attribute Equals", "#qunit-fixture a[rel=bookmark]", ["simon1"] );
	t( "Attribute Equals", "#qunit-fixture a[href='http://www.google.com/']", ["google"] );
	t( "Attribute Equals", "#qunit-fixture a[ rel = 'bookmark' ]", ["simon1"] );
	t( "Attribute Equals Number", "#qunit-fixture option[value=1]", ["option1b","option2b","option3b","option4b","option5c"] );
	t( "Attribute Equals Number", "#qunit-fixture li[tabIndex=-1]", ["foodWithNegativeTabIndex"] );

	document.getElementById("anchor2").href = "#2";
	t( "href Attribute", "p a[href^=#]", ["anchor2"] );
	t( "href Attribute", "p a[href*=#]", ["simon1", "anchor2"] );

	t( "for Attribute", "form label[for]", ["label-for"] );
	t( "for Attribute in form", "#form [for=action]", ["label-for"] );

	t( "Attribute containing []", "input[name^='foo[']", ["hidden2"] );
	t( "Attribute containing []", "input[name^='foo[bar]']", ["hidden2"] );
	t( "Attribute containing []", "input[name*='[bar]']", ["hidden2"] );
	t( "Attribute containing []", "input[name$='bar]']", ["hidden2"] );
	t( "Attribute containing []", "input[name$='[bar]']", ["hidden2"] );
	t( "Attribute containing []", "input[name$='foo[bar]']", ["hidden2"] );
	t( "Attribute containing []", "input[name*='foo[bar]']", ["hidden2"] );

	t( "Multiple Attribute Equals", "#form input[type='radio'], #form input[type='hidden']", ["radio1", "radio2", "hidden1"] );
	t( "Multiple Attribute Equals", "#form input[type='radio'], #form input[type=\"hidden\"]", ["radio1", "radio2", "hidden1"] );
	t( "Multiple Attribute Equals", "#form input[type='radio'], #form input[type=hidden]", ["radio1", "radio2", "hidden1"] );

	t( "Attribute selector using UTF8", "span[lang=中文]", ["台北"] );

	t( "Attribute Begins With", "a[href ^= 'http://www']", ["google","yahoo"] );
	t( "Attribute Ends With", "a[href $= 'org/']", ["mark"] );
	t( "Attribute Contains", "a[href *= 'google']", ["google","groups"] );
	t( "Attribute Is Not Equal", "#ap a[hreflang!='en']", ["google","groups","anchor1"] );

	var opt = document.getElementById("option1a"),
		match = Sizzle.matchesSelector;

	opt.setAttribute("test", "");

	ok( match( opt, "[id*=option1][type!=checkbox]" ), "Attribute Is Not Equal Matches" );
	ok( match( opt, "[id*=option1]" ), "Attribute With No Quotes Contains Matches" );
	ok( match( opt, "[test=]" ), "Attribute With No Quotes No Content Matches" );
	ok( !match( opt, "[test^='']" ), "Attribute with empty string value does not match startsWith selector (^=)" );
	ok( match( opt, "[id=option1a]" ), "Attribute With No Quotes Equals Matches" );
	ok( match( document.getElementById("simon1"), "a[href*=#]" ), "Attribute With No Quotes Href Contains Matches" );

	t( "Empty values", "#select1 option[value='']", ["option1a"] );
	t( "Empty values", "#select1 option[value!='']", ["option1b","option1c","option1d"] );

	t( "Select options via :selected", "#select1 option:selected", ["option1a"] );
	t( "Select options via :selected", "#select2 option:selected", ["option2d"] );
	t( "Select options via :selected", "#select3 option:selected", ["option3b", "option3c"] );
	t( "Select options via :selected", "select[name='select2'] option:selected", ["option2d"] );

	t( "Grouped Form Elements", "input[name='foo[bar]']", ["hidden2"] );

	var a = document.getElementById("groups"),
		title = "Don't click me";
	a.title = title;
	ok( match( a, "a[title=\"Don't click me\"]" ), "Quote within attribute value does not mess up tokenizer" );

	// Uncomment if the boolHook is removed
	// var check2 = document.getElementById("check2");
	// check2.checked = true;
	// ok( !Sizzle.matches("[checked]", [ check2 ] ), "Dynamic boolean attributes match when they should with Sizzle.matches (#11115)" );

	// Make sure attribute value quoting works correctly. See: #6093
	var attrbad = jQuery("<input type=\"hidden\" value=\"2\" name=\"foo.baz\" id=\"attrbad1\"/><input type=\"hidden\" value=\"2\" name=\"foo[baz]\" id=\"attrbad2\"/><input type=\"hidden\" data-attr=\"foo_baz']\" id=\"attrbad3\"/>").appendTo("body");

	t( "Find escaped attribute value", "input[name=foo\\.baz]", ["attrbad1"] );
	t( "Find escaped attribute value", "input[name=foo\\[baz\\]]", ["attrbad2"] );
	t( "Find escaped attribute value", "input[data-attr='foo_baz\\']']", ["attrbad3"] );

	t( "input[type=text]", "#form input[type=text]", ["text1", "text2", "hidden2", "name"] );
	t( "input[type=search]", "#form input[type=search]", ["search"] );

	attrbad.remove();

	// #6428
	t( "Find escaped attribute value", "#form input[name=foo\\[bar\\]]", ["hidden2"] );

	// #3279
	var div = document.createElement("div");
	div.innerHTML = "<div id='foo' xml:test='something'></div>";

	deepEqual( Sizzle( "[xml\\:test]", div ), [ div.firstChild ], "Finding by attribute with escaped characters." );
	div = null;
}