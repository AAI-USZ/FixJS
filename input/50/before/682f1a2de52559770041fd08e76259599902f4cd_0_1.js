function flush(){
			bufs.forEach(function(buf){
				oldWrite(buf)
			})
			bufs = []
		}