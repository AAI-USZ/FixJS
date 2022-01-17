function(buf){//this handles the initial setup
		if(firstBuf){
			needed = schemaBufLength = bin.readInt(buf, 0)
			buf = buf.slice(8)
			firstBuf = false;
		}
		if(needed <= buf.length){
			firstBufs.push(buf.slice(0, needed))
			var schemaStr = mergeBuffers(firstBufs).toString('utf8')
			var all = JSON.parse(schemaStr)
			syncId = all.syncId
			setupBasedOnSchema(all.schema)
			if(buf.length > needed){
				deser(buf.slice(needed))
			}
		}else{
			firstBufs.push(buf)
		}
	}