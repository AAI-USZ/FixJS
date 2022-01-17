function() {

	expect(81);



	var div = jQuery("div").attr("foo", "bar"),

		fail = false;



	for ( var i = 0; i < div.size(); i++ ) {

		if ( div.get(i).getAttribute("foo") != "bar" ){

			fail = i;

			break;

		}

	}



	equal( fail, false, "Set Attribute, the #" + fail + " element didn't get the attribute 'foo'" );



	ok( jQuery("#foo").attr({ "width": null }), "Try to set an attribute to nothing" );



	jQuery("#name").attr("name", "something");

	equal( jQuery("#name").attr("name"), "something", "Set name attribute" );

	jQuery("#name").attr("name", null);

	equal( jQuery("#name").attr("name"), undefined, "Remove name attribute" );

	var $input = jQuery("<input>", { name: "something", id: "specified" });

	equal( $input.attr("name"), "something", "Check element creation gets/sets the name attribute." );

	equal( $input.attr("id"), "specified", "Check element creation gets/sets the id attribute." );



	jQuery("#check2").prop("checked", true).prop("checked", false).attr("checked", true);

	equal( document.getElementById("check2").checked, true, "Set checked attribute" );

	equal( jQuery("#check2").prop("checked"), true, "Set checked attribute" );

	equal( jQuery("#check2").attr("checked"), "checked", "Set checked attribute" );

	jQuery("#check2").attr("checked", false);

	equal( document.getElementById("check2").checked, false, "Set checked attribute" );

	equal( jQuery("#check2").prop("checked"), false, "Set checked attribute" );

	equal( jQuery("#check2").attr("checked"), undefined, "Set checked attribute" );

	jQuery("#text1").attr("readonly", true);

	equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );

	equal( jQuery("#text1").prop("readOnly"), true, "Set readonly attribute" );

	equal( jQuery("#text1").attr("readonly"), "readonly", "Set readonly attribute" );

	jQuery("#text1").attr("readonly", false);

	equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );

	equal( jQuery("#text1").prop("readOnly"), false, "Set readonly attribute" );

	equal( jQuery("#text1").attr("readonly"), undefined, "Set readonly attribute" );



	jQuery("#check2").prop("checked", true);

	equal( document.getElementById("check2").checked, true, "Set checked attribute" );

	equal( jQuery("#check2").prop("checked"), true, "Set checked attribute" );

	equal( jQuery("#check2").attr("checked"), "checked", "Set checked attribute" );

	jQuery("#check2").prop("checked", false);

	equal( document.getElementById("check2").checked, false, "Set checked attribute" );

	equal( jQuery("#check2").prop("checked"), false, "Set checked attribute" );

	equal( jQuery("#check2").attr("checked"), undefined, "Set checked attribute" );



	jQuery("#check2").attr("checked", "checked");

	equal( document.getElementById("check2").checked, true, "Set checked attribute with 'checked'" );

	equal( jQuery("#check2").prop("checked"), true, "Set checked attribute" );

	equal( jQuery("#check2").attr("checked"), "checked", "Set checked attribute" );



	QUnit.reset();



	var $radios = jQuery("#checkedtest").find("input[type='radio']");

	$radios.eq(1).click();

	equal( $radios.eq(1).prop("checked"), true, "Second radio was checked when clicked");

	equal( $radios.attr("checked"), $radios[0].checked ? "checked" : undefined, "Known booleans do not fall back to attribute presence (#10278)");



	jQuery("#text1").prop("readOnly", true);

	equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );

	equal( jQuery("#text1").prop("readOnly"), true, "Set readonly attribute" );

	equal( jQuery("#text1").attr("readonly"), "readonly", "Set readonly attribute" );

	jQuery("#text1").prop("readOnly", false);

	equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );

	equal( jQuery("#text1").prop("readOnly"), false, "Set readonly attribute" );

}