function(){
	S("#scrollable").click().wait(100);

	
	S('.scrollBody').scroll("left",10);
	S('.header').scrollLeft(10, function(){
		ok(true, "assertions make people feel better")
	});
}