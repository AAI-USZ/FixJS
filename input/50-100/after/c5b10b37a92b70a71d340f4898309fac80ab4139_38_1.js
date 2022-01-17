function(id, cb){
			if(bufferIndex[id] !== undefined){
				cb();
				return;
			}
			var fp = filePositions[id];
			_.assertDefined(fp)
			_.assertInt(fp.position);
			_.assertInt(fp.length);
			++stats.readFromDisk
			dataWriter.readRange(fp.position, fp.length, function(buf){

				cache[id] = objReader(buf)
				cb()
			})
		}