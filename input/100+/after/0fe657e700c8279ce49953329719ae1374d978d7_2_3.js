function() {

	expect(31);



	equal( baidu("#text1").prop("value"), "Test", "Check for value attribute" );

	equal( baidu("#text1").prop("value", "Test2").prop("defaultValue"), "Test", "Check for defaultValue attribute" );

	equal( baidu("#select2").prop("selectedIndex"), 3, "Check for selectedIndex attribute" );

	equal( baidu("#foo").prop("nodeName").toUpperCase(), "DIV", "Check for nodeName attribute" );

	equal( baidu("#foo").prop("tagName").toUpperCase(), "DIV", "Check for tagName attribute" );

	equal( baidu("<option/>").prop("selected"), false, "Check selected attribute on disconnected element." );



	equal( baidu("#listWithTabIndex").prop("tabindex"), 5, "Check retrieving tabindex" );

	baidu("#text1").prop("readonly", true);

	equal( document.getElementById("text1").readOnly, true, "Check setting readOnly property with 'readonly'" );

	equal( baidu("#label-for").prop("for"), "action", "Check retrieving htmlFor" );

	baidu("#text1").prop("class", "test");

	equal( document.getElementById("text1").className, "test", "Check setting className with 'class'" );

	equal( baidu("#text1").prop("maxlength"), 30, "Check retrieving maxLength" );

	baidu("#table").prop("cellspacing", 1);

	equal( baidu("#table").prop("cellSpacing"), "1", "Check setting and retrieving cellSpacing" );

	baidu("#table").prop("cellpadding", 1);

	equal( baidu("#table").prop("cellPadding"), "1", "Check setting and retrieving cellPadding" );

	baidu("#table").prop("rowspan", 1);

	equal( baidu("#table").prop("rowSpan"), 1, "Check setting and retrieving rowSpan" );

	baidu("#table").prop("colspan", 1);

	equal( baidu("#table").prop("colSpan"), 1, "Check setting and retrieving colSpan" );

	baidu("#table").prop("usemap", 1);

	equal( baidu("#table").prop("useMap"), 1, "Check setting and retrieving useMap" );

	baidu("#table").prop("frameborder", 1);

	equal( baidu("#table").prop("frameBorder"), 1, "Check setting and retrieving frameBorder" );

	QUnit.reset();



	var body = document.body,

		$body = baidu( body );



	ok( $body.prop("nextSibling") === null, "Make sure a null expando returns null" );

	body["foo"] = "bar";

	equal( $body.prop("foo"), "bar", "Make sure the expando is preferred over the dom attribute" );

	body["foo"] = undefined;

	ok( $body.prop("foo") === undefined, "Make sure the expando is preferred over the dom attribute, even if undefined" );



	var select = document.createElement("select"), optgroup = document.createElement("optgroup"), option = document.createElement("option");

	optgroup.appendChild( option );

	select.appendChild( optgroup );



	equal( baidu(option).prop("selected"), true, "Make sure that a single option is selected, even when in an optgroup." );

	equal( baidu(document).prop("nodeName"), "#document", "prop works correctly on document nodes (bug #7451)." );



	var attributeNode = document.createAttribute("irrelevant"),

		commentNode = document.createComment("some comment"),

		textNode = document.createTextNode("some text"),

		obj = {};

	baidu.each( [document, attributeNode, commentNode, textNode, obj, "#firstp"], function( i, ele ) {

		strictEqual( baidu(ele).prop("nonexisting"), undefined, "prop works correctly for non existing attributes (bug #7500)." );

	});



	obj = {};

	baidu.each( [document, obj], function( i, ele ) {

		var $ele = baidu( ele );

		$ele.prop( "nonexisting", "foo" );

		equal( $ele.prop("nonexisting"), "foo", "prop(name, value) works correctly for non existing attributes (bug #7500)." );

	});

	baidu( document ).removeProp("nonexisting");



	var $form = baidu("#form").prop("enctype", "multipart/form-data");

	equal( $form.prop("enctype"), "multipart/form-data", "Set the enctype of a form (encoding in IE6/7 #6743)" );

}