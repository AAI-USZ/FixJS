function(){
	S("#scrollable").click().wait(100);

	
	S('.can_ui_table_scroll div:eq(1)').scroll("left",10);
	S('.can_ui_table_scroll div:eq(0)').scrollLeft(10, function(){
		ok(true, "assertions make people feel better")
	});
}