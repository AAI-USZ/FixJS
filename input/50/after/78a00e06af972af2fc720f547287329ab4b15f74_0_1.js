function(){
		$(".img_loading").css({"display":"block","text-align": "center"});
		$.get("/build_database_for_testcase	", function(){
			window.location = "/version";
		});
			
	}