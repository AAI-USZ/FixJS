function(){
		log("Game server disconnected.\n\n");
		$("#status_oppo_img").attr("src",'/assets/lobby/broken.png');
		$("#status_me_img").attr("src",'/assets/lobby/broken.png');
		$('#chatInput').attr('disabled','disabled');
	}