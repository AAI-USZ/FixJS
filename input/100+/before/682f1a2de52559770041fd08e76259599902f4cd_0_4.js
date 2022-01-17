function(){
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
				//console.log('finishing ' + si)
				ws.sync(function(){
					//console.log('synced ' + si)	
					var list = segmentIsFinishing[si];
					list.forEach(function(cb){cb();})
					delete segmentIsFinishing[si];
					mws.resume()
					mw.flush()
				})
			}