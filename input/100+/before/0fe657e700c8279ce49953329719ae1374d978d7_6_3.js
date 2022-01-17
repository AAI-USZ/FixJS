function(valueObj) {
	expect(8);

	QUnit.reset();
	jQuery("#text1").val(valueObj( "test" ));
	equal( document.getElementById("text1").value, "test", "Check for modified (via val(String)) value of input element" );

	jQuery("#text1").val(valueObj( undefined ));
	equal( document.getElementById("text1").value, "", "Check for modified (via val(undefined)) value of input element" );

	jQuery("#text1").val(valueObj( 67 ));
	equal( document.getElementById("text1").value, "67", "Check for modified (via val(Number)) value of input element" );

	jQuery("#text1").val(valueObj( null ));
	equal( document.getElementById("text1").value, "", "Check for modified (via val(null)) value of input element" );

	var $select1 = jQuery("#select1");
	$select1.val(valueObj( "3" ));
	equal( $select1.val(), "3", "Check for modified (via val(String)) value of select element" );

	$select1.val(valueObj( 2 ));
	equal( $select1.val(), "2", "Check for modified (via val(Number)) value of select element" );

	$select1.append("<option value='4'>four</option>");
	$select1.val(valueObj( 4 ));
	equal( $select1.val(), "4", "Should be possible to set the val() to a newly created option" );

	// using contents will get comments regular, text, and comment nodes
	var j = jQuery("#nonnodes").contents();
	j.val(valueObj( "asdf" ));
	equal( j.val(), "asdf", "Check node,textnode,comment with val()" );
	j.removeAttr("value");
}