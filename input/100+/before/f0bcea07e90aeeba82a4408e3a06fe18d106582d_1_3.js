function() {
	expect(45);

	t( "Attribute Exists", "a[title]", ["google"] );
	t( "Attribute Exists", "*[title]", ["google"] );
	t( "Attribute Exists", "[title]", ["google"] );
	t( "Attribute Exists", "a[ title ]", ["google"] );

	t( "Attribute Equals", "a[rel='bookmark']", ["simon1"] );
	t( "Attribute Equals", 'a[rel="bookmark"]', ["simon1"] );
	t( "Attribute Equals", "a[rel=bookmark]", ["simon1"] );
	t( "Attribute Equals", "a[href='http://www.google.com/']", ["google"] );
	t( "Attribute Equals", "a[ rel = 'bookmark' ]", ["simon1"] );

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
		match = (window.Sizzle || window.jQuery.find).matchesSelector;

	opt.setAttribute("test", "");

	ok( match( opt, "[id*=option1][type!=checkbox]" ), "Attribute Is Not Equal Matches" );
	ok( match( opt, "[id*=option1]" ), "Attribute With No Quotes Contains Matches" );
	ok( match( opt, "[test=]" ), "Attribute With No Quotes No Content Matches" );
	ok( match( opt, "[id=option1a]" ), "Attribute With No Quotes Equals Matches" );
	ok( match( document.getElementById("simon1"), "a[href*=#]" ), "Attribute With No Quotes Href Contains Matches" );

	t("Empty values", "#select1 option[value='']", ["option1a"]);
	t("Empty values", "#select1 option[value!='']", ["option1b","option1c","option1d"]);

	t("Select options via :selected", "#select1 option:selected", ["option1a"] );
	t("Select options via :selected", "#select2 option:selected", ["option2d"] );
	t("Select options via :selected", "#select3 option:selected", ["option3b", "option3c"] );

	t( "Grouped Form Elements", "input[name='foo[bar]']", ["hidden2"] );

	// Make sure attribute value quoting works correctly. See: #6093
	var attrbad = jQuery('<input type="hidden" value="2" name="foo.baz" id="attrbad1"/><input type="hidden" value="2" name="foo[baz]" id="attrbad2"/>').appendTo("body");

	t("Find escaped attribute value", "input[name=foo\\.baz]", ["attrbad1"]);
	t("Find escaped attribute value", "input[name=foo\\[baz\\]]", ["attrbad2"]);

	t("input[type=text]", "#form input[type=text]", ["text1", "text2", "hidden2", "name"]);
	t("input[type=search]", "#form input[type=search]", ["search"]);

	attrbad.remove();

	//#6428
	t("Find escaped attribute value", "#form input[name=foo\\[bar\\]]", ["hidden2"]);

	//#3279
	var div = document.createElement("div");
	div.innerHTML = "<div id='foo' xml:test='something'></div>";

	deepEqual( jQuery( "[xml\\:test]", div ).get(), [ div.firstChild ], "Finding by attribute with escaped characters." );
}