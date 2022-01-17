function() {
	expect(8);

	var implied = jQuery('<input id="impliedText"/>').appendTo("#form");

	t( "Form element :input", "#form :input", ["text1", "text2", "radio1", "radio2", "check1", "check2", "hidden1", "hidden2", "name", "search", "button", "area1", "select1", "select2", "select3", "select4", "select5", "impliedText"] );
	t( "Form element :radio", "#form :radio", ["radio1", "radio2"] );
	t( "Form element :checkbox", "#form :checkbox", ["check1", "check2"] );
	t( "Form element :text", "#form :text", ["text1", "text2", "hidden2", "name", "impliedText"] );
	t( "Form element :radio:checked", "#form :radio:checked", ["radio2"] );
	t( "Form element :checkbox:checked", "#form :checkbox:checked", ["check1"] );
	t( "Form element :radio:checked, :checkbox:checked", "#form :radio:checked, #form :checkbox:checked", ["radio2", "check1"] );

	t( "Selected Option Element", "#form option:selected", ["option1a","option2d","option3b","option3c","option4b","option4c","option4d","option5a"] );

	implied.remove();
}