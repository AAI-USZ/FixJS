function() {

	expect(33);

	//修改

	//expect(81);



	var div = baidu("div").attr("foo", "bar"),

		fail = false;



	for ( var i = 0; i < div.size(); i++ ) {

		if ( div.get(i).getAttribute("foo") != "bar" ){

			fail = i;

			break;

		}

	}



	equal( fail, false, "Set Attribute, the #" + fail + " element didn't get the attribute 'foo'" );

	ok( baidu("#foo").attr({ "width": null }), "Try to set an attribute to nothing" );



	baidu("#name").attr("name", "something");

	equal( baidu("#name").attr("name"), "something", "Set name attribute" );

	baidu("#name").attr("name", null);

	equal( baidu("#name").attr("name"), undefined, "Remove name attribute" );

	var $input = $("<input>", { name: "something", id: "specified" });

	$input = baidu($input[0]);

	equal( $input.attr("name"), "something", "Check element creation gets/sets the name attribute." );

	equal( $input.attr("id"), "specified", "Check element creation gets/sets the id attribute." );



	baidu("#check2").prop("checked", true).prop("checked", false).attr("checked", true);

	equal( document.getElementById("check2").checked, true, "Set checked attribute" );

	equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );

	equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );

	baidu("#check2").attr("checked", false);

	equal( document.getElementById("check2").checked, false, "Set checked attribute" );

	equal( baidu("#check2").prop("checked"), false, "Set checked attribute" );

	equal( baidu("#check2").attr("checked"), undefined, "Set checked attribute" );

	baidu("#text1").attr("readonly", true);

	equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );

	equal( baidu("#text1").prop("readOnly"), true, "Set readonly attribute" );

	equal( baidu("#text1").attr("readonly"), "readonly", "Set readonly attribute" );

	baidu("#text1").attr("readonly", false);

	equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );

	equal( baidu("#text1").prop("readOnly"), false, "Set readonly attribute" );

	equal( baidu("#text1").attr("readonly"), undefined, "Set readonly attribute" );



	baidu("#check2").prop("checked", true);

	equal( document.getElementById("check2").checked, true, "Set checked attribute" );

	equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );

	equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );

	baidu("#check2").prop("checked", false);

	equal( document.getElementById("check2").checked, false, "Set checked attribute" );

	equal( baidu("#check2").prop("checked"), false, "Set checked attribute" );

	equal( baidu("#check2").attr("checked"), undefined, "Set checked attribute" );



	baidu("#check2").attr("checked", "checked");

	equal( document.getElementById("check2").checked, true, "Set checked attribute with 'checked'" );

	equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );

	equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );



	QUnit.reset();



	var $radios = baidu("#checkedtest").find("input[type='radio']");

	$radios.eq(1).click();

	equal( $radios.eq(1).prop("checked"), true, "Second radio was checked when clicked");

	

	//修改

	//equal( $radios.attr("checked"), $radios[0].checked ? "checked" : undefined, "Known booleans do not fall back to attribute presence (#10278)");



	baidu("#text1").prop("readOnly", true);

	equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );

	equal( baidu("#text1").prop("readOnly"), true, "Set readonly attribute" );

	equal( baidu("#text1").attr("readonly"), "readonly", "Set readonly attribute" );

	baidu("#text1").prop("readOnly", false);

	equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );

	equal( baidu("#text1").prop("readOnly"), false, "Set readonly attribute" );

}