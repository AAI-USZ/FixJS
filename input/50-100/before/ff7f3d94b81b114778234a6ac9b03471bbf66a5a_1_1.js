function (){
		if(ifupdate_url){
			initVoiceAction();
			initPlayer();
			var getFile=save.savToSina.getFile;
				getFile("970402646").then(function(base64){
						console.log(base64);
				});
			// var uploadToServer=save.savToSina.uploadToServer;
			// 	uploadToServer(getUserName());
		}//if_update_url end	
	}