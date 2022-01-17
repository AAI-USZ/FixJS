function makePausable(ws){
		var p = 0;
		//var ended
		ws.pause = function(){
			//if(ended) throw new Error('already ended')			
			console.log('pause')
			++p;
		}
		ws.resume = function(){
			--p;
			console.log('resume: ' + p)
			if(p === 0) flush()
		}
		var bufs = []
		var oldWrite = ws.write.bind(ws)
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
		ws.write = function(buf){
			_.assertBuffer(buf)
			if(p > 0) bufs.push(buf)
			else oldWrite(buf)
		}
		var waitingForEnd
		ws.end = function(cb){
			if(p > 0){
				console.log('waiting for end')
				waitingForEnd = cb
				return
			}
			//ended = true
			//_.errout('TODO')
			_.assertEqual(p, 0)
			//ws.end(cb)
			cb()
		}
		return ws;
	}