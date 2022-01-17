function() {
	expect(2);

	baidu("#qunit-fixture").html("<article><section><aside>HTML5 elements</aside></section></article>");
	equal( $("#qunit-fixture").children().children().length, 1, "Make sure HTML5 article elements can hold children. innerHTML shortcut path" );
	equal( $("#qunit-fixture").children().children().children().length, 1, "Make sure nested HTML5 elements can hold children." );
}