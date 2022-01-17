function(cb){
			//console.log('syncing!!!!!!!!!!!1')
			if(buffering){
				forceWrite()
			}
			//console.log('cont')
			if(oldWs){
				oldWs.sync(function(){
					oldWs = undefined;
					lws.sync(cb)
				})
				return;
			}
			if(written === writtenSinceLastSync){
				process.nextTick(cb)
				return;
			}
						
			if(draining){
				//console.log('draining...')
				drainingSync.push(cb)
			}else{
				sync(written, cb)
			}
		}