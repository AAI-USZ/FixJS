function(){
			//console.log(rr + ' ending')
			if(buffering){
				forceWrite()
			}
			ending = true
			if(draining){
				//console.log('waiting for drain')
				lws.once('drain', function(){
					//console.log(rr + ' got drain')
					oldEnd()
				});
			}else{
				oldEnd()
			}
		}