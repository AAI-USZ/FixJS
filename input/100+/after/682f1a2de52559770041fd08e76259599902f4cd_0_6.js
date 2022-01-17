f	if(arguments.length === 2){
		cb = readCb;
		readCb = undefined;
	}else{
		_.assertLength(arguments, 4);
	}
	
	_.assertString(path)
	
	var segments = [];
	var discarded = [];

	var totalOffset = 0;

	var reader = segmentationParser.binary.stream.makeReader({
		discard: function(d){
			_.assertInt(d);
			_.assertInt(segments[d])
			//console.log('*read discard def: ' + d)
			discarded[d] = true;
		},
		segment: function(s){
			_.assertInt(s);
			//console.log('*read segment def: ' + s)
			segments.push(s);
			totalOffset += s;
		}
	})
	
	
	var mws;
	
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
	
	var segmentationFd
	
	//console.log('locking on ' + path+'.segmentation...')
	fs.open(path+'.segmentation', 'a+', function(err, fd){
		if(err) throw err;
		_.assertDefined(fd)
		segmentationFd = fd
		fsExt.flock(fd, 'exnb', function (err) {//take out an exclusive lock on segmentation to ensure only one writer
			if(err){
				err.path = path+'.segmentation';
				throw err;
			}
			
			//console.log('...got lock.');
			fs.fstat(fd, function(err, stats){
				if(err) throw err;
				//console.log('opened segmentation, file is: ' + stats.size)
				readAll(fd, stats.size, reader, function(){
					//reader.assertUsedAll(stats.size)
					_.assertEqual(stats.size, reader.manyBytesRead)
					mws = makePausable(fs.createWriteStream(path+'.segmentation', {flags: 'a+'}));

					loadWriteStreamForLastSegment(finish)
				});
			})
		})
	})

	var ws;
	var currentSegmentSize;

	var segmentIsFinishing = {}
		
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
	
	function loadWriteStreamForLastSegment(doneCb){
		var lastPath = path+'.'+segments.length+'.segment'

		switchWriteStream(false, lastPath, function(){

			fs.stat(lastPath, function(err, stat){
				if(err) throw err;
				//console.log('last path(' + lastPath + ') size: ' + stat.size)
				currentSegmentSize = stat.size;
			
				doneCb()
			})
		})
	}
	
	var todoDiscard = []
	
	function finish(){
		//console.log('in finish')
		
		function readOneSegment(){
			if(fdIndex > segments.length){
				finalFinish();
				return;
			}
			//_.assert(fdIndex < segments.length)
			var len = segments[fdIndex];
			var d = discarded[fdIndex];
			segmentCb(fdIndex, !!d)
			if(len === undefined){
				len = currentSegmentSize;
				_.assertEqual(fdIndex, segments.length);
				//console.log('(last)');
			}
			//totalOffset += len;
			
			if(d){
				++fdIndex;
				return true;
			}else{
				//console.log('read segment: ' + len + ' ' + fdIndex + ' ' + d)

				//console.log('reading all')
				if(len === 0 && fdIndex < segments.length){// || fd === undefined){
					todoDiscard.push(fdIndex)
					++fdIndex;
					return true;
				}else{
					//_.assertDefined(fd)
					var segmentPath = path+'.'+fdIndex+'.segment';
					var index = fdIndex;
					++fdIndex;
					fs.open(segmentPath, 'r', function(err, fd){
						if(err){
							if(err.code === 'ENOENT'){
								todoDiscard.push(index)
								readMore()
								return;
							}else{
								throw err;
							}
						}
						readAll(fd, len, readCb, function(){
							fs.close(fd, function(err){if(err) throw err;});
							readMore()
						})
					})
				}
			}
		}
		function readMore(){
			while(readOneSegment()){}
		}
		
		if(readCb){
			//totalOffset = 0;
			var fdIndex = 0;
			
			readMore()
		}else{
			finalFinish();
		}
	}
	
	function readSegment(segmentIndex, dataCb, doneCb){
		_.assertInt(segmentIndex)
		_.assert(segmentIndex < segments.length)
		var fd;
		fs.open(path+'.'+segmentIndex+'.segment', 'r', function(err, theFd){
			if(err) throw err;
			fd = theFd;
			finish();
		})
		function finish(){
			var len = segments[segmentIndex];
			_.assertInt(len)
			//console.log('reading segment ' + segmentIndex + ' ' + len)
			readAll(fd, len, dataCb, after, path+'.'+segmentIndex+'.segment')
						
			function after(){
				fs.close(fd, function(err){if(err) throw err;});
				doneCb()
			}
		}
	}
	
	function discardSegment(segmentId){
		_.assertInt(segmentId)
		//console.log(segmentId +'<'+ segments.length)
		_.assert(segmentId < segments.length)
		
		function finishDiscard(){

			var segmentPath = path+'.'+segmentId+'.segment'
			fs.unlink(segmentPath, function(err){
				if(err){
					if(err.code === 'ENOENT'){
						console.log('WARNING: tried to unlink non-existent file: ' + segmentPath);
					}else{
						throw err;
					}
				}
				mw.discard(segmentId)//deleting, then discarding, ensures we never have discarded but undeleted files left orphaned.
				mw.flush()
				//console.log('deleted segment')
			})			
		}
		
		if(!discarded[segmentId]){
			
			discarded[segmentId] = true;
			
			if(segmentIsFinishing[segmentId]){
				segmentIsFinishing[segmentId].push(finishDiscard)
			}else{
				finishDiscard();
			}
		}else{
			_.errout('segment does not exist or was already discarded');
		}
	}
	var mw;
	
	function finalFinish(){
	
		mw = segmentationParser.binary.stream.makeWriter(mws);
		
		//console.log('in finalFinish')

		var w = new EventEmitter();
		
		w.sync = function(cb){
			ws.sync(cb)
		}
		
		todoDiscard.forEach(discardSegment)
		todoDiscard = undefined;
		
		var raSegmentOpen = _.doOnce(
			function(segmentIndex){return segmentIndex;},
			function(segmentIndex, cb){
				var segmentPath = path+'.'+segmentIndex+'.segment'
				fs.open(segmentPath, 'r', function(err, fd){
					if(err) throw err;
					cb(fd)//TODO optimize - reclaim fds - prevent fd leak
				})
			})
		
		//var readOut = 0;
		
		var handle = {
			readRange: function(pos, len, cb){//must not span multiple segments
				var off = 0;
				var remainingOff;
				for(var i=0;i<segments.length;++i){
					var segmentLength = segments[i];
					off += segmentLength;
					if(pos < off){
						if(pos+len > off){
							throw new Error('length must be invalid, it crosses segment boundaries: ' + (pos+len) + ' > ' + off);
						}
						remainingOff = pos - (off-segmentLength)
						break;
					}
				}
				if(discarded[i]){
					throw new Error('read range lies within discarded segment')
				}
				if(i === segments.length && pos+len > off + currentSegmentSize){
					throw new Error('readRange extends beyond the bounds of the file: ' + 
						pos+'+'+len+' > ' + off + '+' + currentSegmentSize+' (' + (pos+len)+' > '+(off+currentSegmentSize)+')');
				}
				
				var segmentPath = path+'.'+i+'.segment'

				raSegmentOpen(i, function(fd){
					//console.log('reading at ' + remainingOff + ' ' + i)
					/*++readOut
					if(readOut % 10000 === 0 || readOut < 10){
						console.log('more out: ' + readOut)
					}*/
					readOffsetEntirely(fd, remainingOff, len, function(buf){
						//console.log('...done reading at ' + remainingOff + ' ' + i)
						/*--readOut
						if(readOut % 1000 === 0 || readOut < 10){
							console.log('still out: ' + readOut)
						}*/
						cb(buf)
					});
				})
			},
			readSegment: function(segmentIndex, dataCb, doneCb){
				if(segmentIsFinishing[segmentIndex]){
					segmentIsFinishing[segmentIndex].push(function(){
						readSegment(segmentIndex, dataCb, doneCb)
					})
				}else{
					readSegment(segmentIndex, dataCb, doneCb)
				}
			},
			write: function(buf){
				currentSegmentSize += buf.length;
				var to = totalOffset;
				totalOffset += buf.length;
				//console.log('segmented file wrote to ws: ' + buf.length)
				ws.write(buf)
				return to;
			},
			getSegmentSize: function(segmentId){
				_.assertInt(segmentId)
				_.assert(segmentId < segments.length)
				return segments[segmentId];
			},
			discard: discardSegment,
			segment: function(){
				//console.log('segmented! ' + currentSegmentSize)

				ws.end();
				segments.push(currentSegmentSize);

				var lastPath = path+'.'+segments.length+'.segment'
				var oldWs = ws;
				switchWriteStream(true, lastPath)
				
				mws.pause()//don't let the mw write the metadata until we've synced the data itself
				mw.segment(currentSegmentSize);
				var si = segments.length-1
				//console.log('finishing segment ' + si + ' ' + currentSegmentSize)
				currentSegmentSize = 0;
				segmentIsFinishing[si] = []
				console.log('finishing ' + si)
				ws.sync(function(){
					console.log('synced ' + si)	
					var list = segmentIsFinishing[si];
					list.forEach(function(cb){cb();})
					delete segmentIsFinishing[si];
					mws.resume()
					mw.flush()
				})
			},
			getCurrentSegmentSize: function(){
				return currentSegmentSize;
			},
			end: function(cb){
				var cdl = _.latch(2, function(){
					console.log('closed segmented file')
					if(cb) cb();
				})
				_.assertDefined(segmentationFd)
				fsExt.flock(segmentationFd, 'un', function(err){
					if(err) throw err
					//console.log('unlocked segmentation file: ' + path + '.segmentation')
					fs.close(segmentationFd, function(){
						cdl()
						console.log('finished close')
						mw.end(function(){console.log('finished mw');cdl()})
						//mws.end(function(){console.log('finished mws');cdl()});
					})
				})
				//ws.end()
				//cdl()
			}
		}
		//_.extend(w, handle)
		Object.keys(handle).forEach(function(key){
			w[key] = handle[key]
		})
		cb(w)
	}
}
