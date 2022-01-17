function(id, cb){//TODO optimize away
			var index = bufferIndex[id];
			if(index === undefined){

				var cached = cache[id];
				if(cached){
					//cb(cached)
					//var json = objReader(cached);
					cb(cached)
				}else{
					readObject(id, cb)
				}
			}else{
				var buf = buffer[index].data
				//var parserId = bin.readInt(buf, 0)//parserIds[index];
				//var dataBuf = buf.slice(4)
				//cb(parserId, parsers[parserId], dataBuf)
				var json = objReader(buf);
				cb(json)				
			}
		}