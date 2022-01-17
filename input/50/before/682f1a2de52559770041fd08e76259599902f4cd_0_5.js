function(){
			if(draining){
				lws.once('drain', function(){
					oldEnd()
				});
			}else{
				oldEnd()
			}
		}