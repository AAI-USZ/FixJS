function(){
	S("#scrollable").click().wait(100);


	S('.tableScroll div:eq(0)').scroll("left", 10);
	S('.tableScroll div:eq(0)').scrollLeft(10, function(){
		ok(true, "assertions make people feel better")
	});
}