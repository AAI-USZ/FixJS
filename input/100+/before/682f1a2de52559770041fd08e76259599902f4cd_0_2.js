function makePausable(ws){
		var p = 0;
		ws.pause = function(){
			++p;
		}
		ws.resume = function(){
			--p;
			if(p === 0) flush()
		}
		var bufs = []
		var oldWrite = ws.write.bind(ws)
		function flush(){
			bufs.forEach(function(buf){
				oldWrite(buf)
			})
			bufs = []
		}
		ws.write = function(buf){
			_.assertBuffer(buf)
			if(p > 0) bufs.push(buf)
			else oldWrite(buf)
		}
		ws.end = function(cb){
			//_.errout('TODO')
			_.assertEqual(p, 0)
			//ws.end(cb)
			cb()
		}
		return ws;
	}