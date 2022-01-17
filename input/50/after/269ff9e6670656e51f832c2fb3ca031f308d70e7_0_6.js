function(seekid){
		$(".my-seeks > div").has("button[id=seek_"+seekid+"]").remove();
		if ($(".my-seeks > div").length == 0)
			$("#my-seeks-title").text("No seeks from you");
	}