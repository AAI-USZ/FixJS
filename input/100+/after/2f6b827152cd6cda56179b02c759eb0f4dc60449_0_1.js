f		_.assertDefined(w)
		var ew = new EventEmitter()
		ew.write = function(buf){
			//console.log('indexfile writing ' + buf.length)
			var res = w.write(buf);
			if(w.getCurrentSegmentSize() > maxSegmentLength){
				//console.log('oversize: ' + w.getCurrentSegmentSize())
				makeNewSegment();
				w = undefined;
			}
			return res;
		}
		if(oldDrain){
			w.removeListener('drain', oldDrain)
		}
		function newDrain(){
			ew.emit('drain');
		}
		w.on('drain', newDrain)

		oldDrain = newDrain;
		
		var pw = indexParser.binary.stream.makeWriter(maxSegmentLength, ew)
		
		var res = {}
		//_.each(pw, function(f, key){
		Object.keys(pw).forEach(function(key){
			var f = pw[key]
			
			if(key === 'flush'){
				res[key] = f;
				return;
			}
			res[key] = function(e, manyAdded){
				_.assertInt(manyAdded)
				var localSegOff = segOff;
				f(e);
				_.assertInt(segmentCounts[localSegOff])
				segmentCounts[localSegOff] += manyAdded;
				fullSegmentCounts[localSegOff] += manyAdded;
				return localSegOff;
			}
		})
		return res;
	}
