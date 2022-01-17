function() {
	expect(10);
	//expect( 12 );

	var $first;

	equal( baidu("#mark").removeAttr( "class" ).attr("class"), undefined, "remove class" );
	equal( baidu("#form").removeAttr("id").attr("id"), undefined, "Remove id" );
	equal( baidu("#foo").attr("style", "position:absolute;").removeAttr("style").attr("style"), undefined, "Check removing style attribute" );

	//修改
	//equal( baidu("#form").attr("style", "position:absolute;").removeAttr("style").attr("style"), undefined, "Check removing style attribute on a form" );
	equal( baidu("<div style='position: absolute'></div>").appendTo("#foo").removeAttr("style").prop("style").cssText, "", "Check removing style attribute (#9699 Webkit)" );
	
	//修改
	//equal( baidu("#fx-test-group").attr("height", "3px").removeAttr("height").get(0).style.height, "1px", "Removing height attribute has no effect on height set with style attribute" );

	baidu("#check1").removeAttr("checked").prop("checked", true).removeAttr("checked");
	equal( document.getElementById("check1").checked, false, "removeAttr sets boolean properties to false" );
	baidu("#text1").prop("readOnly", true).removeAttr("readonly");
	equal( document.getElementById("text1").readOnly, false, "removeAttr sets boolean properties to false" );

	baidu("#option2c").removeAttr("selected");
	equal( baidu("#option2d").attr("selected"), "selected", "Removing `selected` from an option that is not selected does not remove selected from the currently selected option (#10870)");

	try {
		$first = baidu("#first").attr("contenteditable", "true").removeAttr("contenteditable");
		equal( $first.attr('contenteditable'), undefined, "Remove the contenteditable attribute" );
	} catch(e) {
		ok( false, "Removing contenteditable threw an error (#10429)" );
	}
	
	$first = baidu("<div Case='mixed'></div>");
	equal( $first.attr("Case"), "mixed", "case of attribute doesn't matter" );
	$first.removeAttr("Case");
	// IE 6/7 return empty string here, not undefined
	ok( !$first.attr("Case"), "mixed-case attribute was removed" );
}