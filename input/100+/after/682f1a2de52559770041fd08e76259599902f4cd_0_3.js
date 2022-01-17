function switchWriteStream(isNew, newPath, openCb){
		var oldWs = ws;
		var lws = fs.createWriteStream(newPath, {flags: isNew ? 'w' : 'a'});
		var drainingSync = []
		var draining = false;
		var oldWrite = lws.write.bind(lws);

		var ending = false
		
		lws.on('open', function(){
			if(openCb) openCb()
		})
		
		var buffering = false;
		//var bufferingSync = []

		var written = 0;
		var writtenSinceLastSync = 0;
		
		var bufsBuffer = []
		var writeTimeoutHandle;
		lws.write = function(bufOrString, encoding){
			if(ending) throw new Exception('cannot write after we have started ending')
			if(_.isString(bufOrString)){
				encoding = encoding || 'utf8'
				bufOrString = new Buffer(bufOrString, encoding);
			}
			written += bufOrString.length
			//console.log('ws file: ' + newPath)
			//console.log('wrote to oldWrite: ' + bufOrString.length)
			buffering = true
			bufsBuffer.push(bufOrString)
			if(writeTimeoutHandle === undefined){
				writeTimeoutHandle = setTimeout(writeLater, 50)
			}
		}
		var rr = Math.random()
		function forceWrite(){
			console.log('forcing write')
			_.assertDefined(writeTimeoutHandle)
			clearTimeout(writeTimeoutHandle)
			writeLater()
		}
		
		function writeLater(){
			_.assert(!ending)
			_.assert(bufsBuffer.length > 0)
			writeTimeoutHandle = undefined
			var total = 0
			for(var i=0;i<bufsBuffer.length;++i){
				total += bufsBuffer[i].length
			}
			var nb = new Buffer(total)
			var off = 0
			for(var i=0;i<bufsBuffer.length;++i){
				var b = bufsBuffer[i]
				b.copy(nb, off)
				off += b.length
			}
			console.log(rr + ' writing: ' + nb.length)
			var res = oldWrite(nb)
			draining = draining || !res
			buffering = false
			bufsBuffer = []

			//bufferingSync.forEach(lws.sync)
			//bufferingSync = []
		}
		
		
		
		var fd;
		var delayedSync;
		var fsyncWaiter

		function initFsyncWaiter(){
			fsyncWaiter = _.doOnce(
				function(written){return written;},
				function(w, cb){
					//console.log('fsyncing fd: ' + fd)
					fs.fsync(fd, function(err){
						if(err) throw err;

						writtenSinceLastSync = w
						//console.log('cbing sync')
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
				//console.log('opened: ' + newPath + ' ' + delayedSync.length)
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
				//console.log('delayed sync')
				delayedSync.push(function(){
					//console.log('undelayed sync')
					cb()
				});
			}else{
				//console.log('waiter sync')
				fsyncWaiter(written, function(){
					//console.log('fsync waiter returned')
					cb()
				})
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
				fsyncWaiter(written, function(){
					//console.log('in process-delayed-sync')
					cb()
				})
			})
		}

		var closed = false;
		
		lws.sync = function(cb){
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
		var oldEnd = lws.end.bind(lws);
		lws.end = function(){
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
		
		lws.on('drain', function(){
			if(draining){
				draining = false;
				//console.log('drained: ' + drainingSync.length)
				var ds = drainingSync
				drainingSync = []
				ds.forEach(lws.sync)
			}
		})

		lws.on('close', function(){
			_.assertNot(draining)
			closed = true;
		})
		ws = lws;
	}