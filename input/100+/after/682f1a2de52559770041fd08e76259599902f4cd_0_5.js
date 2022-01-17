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