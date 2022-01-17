function(ids, cb){
			console.log('ol getSet ' + ids.length)
			_.assertFunction(cb)
			
			if(ids.length === 0) throw new Error('you probably should not call this with zero values, since it will never callback')
			for(var i=0;i<ids.length;++i){
				var id = ids[i];
				var index = bufferIndex[id];
				if(index === undefined){
					readObject(id, cb);					
				}else{
					var dataBuf = buffer[index].data
					//var parserId = parserIds[index];
					//cb(parserId, parsers[parserId], dataBuf)
					cb(objReader(dataBuf))
				}
				//handle.get(id, cb)
			}
		}