function switchWriteStream(isNew, newPath, openCb){
		var oldWs = ws;
		var lws = fs.createWriteStream(newPath, {flags: isNew ? 'w' : 'a'});
		var drainingSync = []
		var draining = false;
		var oldWrite = lws.write.bind(lws);
		
		lws.on('open', function(){
			if(openCb) openCb()
		})

		var written = 0;
		var writtenSinceLastSync = 0;
		
		lws.write = function(bufOrString, encoding){
			if(_.isString(bufOrString)){
				encoding = encoding || 'utf8'
				bufOrString = new Buffer(bufOrString, encoding);
			}
			written += bufOrString.length
			console.log('ws file: ' + newPath)
			console.log('wrote to oldWrite: ' + bufOrString.length)
			var res = oldWrite(bufOrString)
			if(!res) draining = true;
		}
		
		var fd;
		var delayedSync;
		var fsyncWaiter

		function initFsyncWaiter(){
			fsyncWaiter = _.doOnce(
				function(written){return written;},
				function(w, cb){
					fs.fsync(fd, function(err){
						if(err) throw err;

						writtenSinceLastSync = w
						cb()
					})
				},
				function(count){
					if(count === 0) closeFd()
				})
		}
		function openFd(){
			_.assertUndefined(delayedSync)
			delayedSync = []
			fs.open(newPath, 'a+', function(err, theFd){
				if(err) throw err;
				fd = theFd;
				initFsyncWaiter()
				processDelayedSync()
			})
		}
		function closeFd(){
			var theFd = fd;
			fd = undefined;
			fsyncWaiter = undefined;
			delayedSync = undefined
			fs.close(theFd, function(err){if(err) throw err;});
		}
		function sync(written, cb){
			if(fd === undefined){
				if(delayedSync === undefined){
					openFd()
				}
				delayedSync.push(cb);
			}else{
				fsyncWaiter(written, cb)
			}
		}
		function processDelayedSync(){
			var ds = delayedSync
			delayedSync = undefined;
			if(ds.length === 0){
				close();
				return;
			}
			ds.forEach(function(cb){
				fsyncWaiter(written, cb)
			})
		}

		var closed = false;
		
		lws.sync = function(cb){
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
				drainingSync.push(cb)
			}else{
				sync(written, cb)
			}
		}
		
		var oldEnd = lws.end.bind(lws);
		lws.end = function(){
			if(draining){
				lws.once('drain', function(){
					oldEnd()
				});
			}else{
				oldEnd()
			}
		}
		
		lws.on('drain', function(){
			if(draining){
				draining = false;
				drainingSync.forEach(lws.sync)
				drainingSync = []
			}
		})

		lws.on('close', function(){
			_.assertNot(draining)
			closed = true;
		})
		ws = lws;
	}