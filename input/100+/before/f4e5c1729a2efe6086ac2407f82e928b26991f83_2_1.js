function() {
	expect( 10 );
	var $first;

	equal( jQuery("#mark").removeAttr( "class" ).attr("class"), undefined, "remove class" );
	equal( jQuery("#form").removeAttr("id").attr("id"), undefined, "Remove id" );
	equal( jQuery("#foo").attr("style", "position:absolute;").removeAttr("style").attr("style"), undefined, "Check removing style attribute" );
	equal( jQuery("#form").attr("style", "position:absolute;").removeAttr("style").attr("style"), undefined, "Check removing style attribute on a form" );
	equal( jQuery("<div style='position: absolute'></div>").appendTo("#foo").removeAttr("style").prop("style").cssText, "", "Check removing style attribute (#9699 Webkit)" );
	equal( jQuery("#fx-test-group").attr("height", "3px").removeAttr("height").get(0).style.height, "1px", "Removing height attribute has no effect on height set with style attribute" );

	jQuery("#check1").removeAttr("checked").prop("checked", true).removeAttr("checked");
	equal( document.getElementById("check1").checked, false, "removeAttr sets boolean properties to false" );
	jQuery("#text1").prop("readOnly", true).removeAttr("readonly");
	equal( document.getElementById("text1").readOnly, false, "removeAttr sets boolean properties to false" );

	jQuery("#option2c").removeAttr("selected");
	equal( jQuery("#option2d").attr("selected"), "selected", "Removing `selected` from an option that is not selected does not remove selected from the currently selected option (#10870)");

	try {
		$first = jQuery("#first").attr("contenteditable", "true").removeAttr("contenteditable");
		equal( $first.attr('contenteditable'), undefined, "Remove the contenteditable attribute" );
	} catch(e) {
		ok( false, "Removing contenteditable threw an error (#10429)" );
	}
}