function(seekid){
		$(".seek-list > div").has("button[id=seek_"+seekid+"]").remove();
		if ($(".seek-list > div").length == 0)
			$("#seeks-title").text("No seeks from others");
	}