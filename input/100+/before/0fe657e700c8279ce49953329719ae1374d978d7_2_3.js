function() {

	expect(31);



	equal( jQuery("#text1").prop("value"), "Test", "Check for value attribute" );

	equal( jQuery("#text1").prop("value", "Test2").prop("defaultValue"), "Test", "Check for defaultValue attribute" );

	equal( jQuery("#select2").prop("selectedIndex"), 3, "Check for selectedIndex attribute" );

	equal( jQuery("#foo").prop("nodeName").toUpperCase(), "DIV", "Check for nodeName attribute" );

	equal( jQuery("#foo").prop("tagName").toUpperCase(), "DIV", "Check for tagName attribute" );

	equal( jQuery("<option/>").prop("selected"), false, "Check selected attribute on disconnected element." );



	equal( jQuery("#listWithTabIndex").prop("tabindex"), 5, "Check retrieving tabindex" );

	jQuery("#text1").prop("readonly", true);

	equal( document.getElementById("text1").readOnly, true, "Check setting readOnly property with 'readonly'" );

	equal( jQuery("#label-for").prop("for"), "action", "Check retrieving htmlFor" );

	jQuery("#text1").prop("class", "test");

	equal( document.getElementById("text1").className, "test", "Check setting className with 'class'" );

	equal( jQuery("#text1").prop("maxlength"), 30, "Check retrieving maxLength" );

	jQuery("#table").prop("cellspacing", 1);

	equal( jQuery("#table").prop("cellSpacing"), "1", "Check setting and retrieving cellSpacing" );

	jQuery("#table").prop("cellpadding", 1);

	equal( jQuery("#table").prop("cellPadding"), "1", "Check setting and retrieving cellPadding" );

	jQuery("#table").prop("rowspan", 1);

	equal( jQuery("#table").prop("rowSpan"), 1, "Check setting and retrieving rowSpan" );

	jQuery("#table").prop("colspan", 1);

	equal( jQuery("#table").prop("colSpan"), 1, "Check setting and retrieving colSpan" );

	jQuery("#table").prop("usemap", 1);

	equal( jQuery("#table").prop("useMap"), 1, "Check setting and retrieving useMap" );

	jQuery("#table").prop("frameborder", 1);

	equal( jQuery("#table").prop("frameBorder"), 1, "Check setting and retrieving frameBorder" );

	QUnit.reset();



	var body = document.body,

		$body = jQuery( body );



	ok( $body.prop("nextSibling") === null, "Make sure a null expando returns null" );

	body["foo"] = "bar";

	equal( $body.prop("foo"), "bar", "Make sure the expando is preferred over the dom attribute" );

	body["foo"] = undefined;

	ok( $body.prop("foo") === undefined, "Make sure the expando is preferred over the dom attribute, even if undefined" );



	var select = document.createElement("select"), optgroup = document.createElement("optgroup"), option = document.createElement("option");

	optgroup.appendChild( option );

	select.appendChild( optgroup );



	equal( jQuery(option).prop("selected"), true, "Make sure that a single option is selected, even when in an optgroup." );

	equal( jQuery(document).prop("nodeName"), "#document", "prop works correctly on document nodes (bug #7451)." );



	var attributeNode = document.createAttribute("irrelevant"),

		commentNode = document.createComment("some comment"),

		textNode = document.createTextNode("some text"),

		obj = {};

	jQuery.each( [document, attributeNode, commentNode, textNode, obj, "#firstp"], function( i, ele ) {

		strictEqual( jQuery(ele).prop("nonexisting"), undefined, "prop works correctly for non existing attributes (bug #7500)." );

	});



	obj = {};

	jQuery.each( [document, obj], function( i, ele ) {

		var $ele = jQuery( ele );

		$ele.prop( "nonexisting", "foo" );

		equal( $ele.prop("nonexisting"), "foo", "prop(name, value) works correctly for non existing attributes (bug #7500)." );

	});

	jQuery( document ).removeProp("nonexisting");



	var $form = jQuery("#form").prop("enctype", "multipart/form-data");

	equal( $form.prop("enctype"), "multipart/form-data", "Set the enctype of a form (encoding in IE6/7 #6743)" );

}