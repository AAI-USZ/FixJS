function() {

	$("#outer").bind("swipe",function(){
		ok(false,"Swipe shouldn't be called when dragged more than swipe.max");
	});
	stop();
	Syn.drag({
		from: "20x20",
		to: "20x96",
		duration: 100
	},"outer", function(){
		start();
	})

}