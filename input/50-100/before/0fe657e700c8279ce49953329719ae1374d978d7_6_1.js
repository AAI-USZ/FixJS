function() {
	expect(4);
	jQuery("#form").append("<input type='checkbox' name='arrayTest' value='1' /><input type='checkbox' name='arrayTest' value='2' /><input type='checkbox' name='arrayTest' value='3' checked='checked' /><input type='checkbox' name='arrayTest' value='4' />");
	var elements = jQuery("input[name=arrayTest]").val([ 1, 2 ]);
	ok( elements[0].checked, "First element was checked" );
	ok( elements[1].checked, "Second element was checked" );
	ok( !elements[2].checked, "Third element was unchecked" );
	ok( !elements[3].checked, "Fourth element remained unchecked" );

	elements.remove();
}