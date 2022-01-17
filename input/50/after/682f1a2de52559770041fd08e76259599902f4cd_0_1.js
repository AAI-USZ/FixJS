function flush(){
			bufs.forEach(function(buf){
				oldWrite(buf)
			})
			bufs = []
			if(waitingForEnd){
				//ended = true
				waitingForEnd()
				waitingForEnd = false
			}
		}