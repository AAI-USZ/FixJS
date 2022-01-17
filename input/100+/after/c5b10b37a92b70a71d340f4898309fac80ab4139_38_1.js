function writeToDisk(){
		//just write all new parsers, assume they'll get used
		
		//console.log('writing to disk, buffer length: ' + buffer.length)
		
		newParsers.forEach(function(parserId){
			var parserBuf = parsers[parserId];
			indexWriter.writer.parser({id: parserId, data: parserBuf}, 1)
		})
		newParsers = [];
		
		var writingBuffer = buffer.slice(0, BufferFlushChunkSize);
		var indexObj = {versionId: -1, objects: []};
		//TODO consolidate write into a single buffer for performance?
		writingBuffer.forEach(function(b, index){
			if(b.versionId > indexObj.versionId) indexObj.versionId = b.versionId;
			
			//var pos = dataWriter.getOffset();
			var len = b.data.length;
			var pos = dataWriter.write(b.data);
			var fp = {id: b.id, position: pos, length: len, typeCode: b.typeCode};
			//console.log(b.id + ' -> (' + pos + ',' + len + ') (' + b.typeCode + ')')
			indexObj.objects.push(fp)
			delete bufferIndex[b.id];
			filePositions[b.id] = fp;
		})

		//console.log('syncing...')
		//isWriting = true;

		Object.keys(bufferIndex).forEach(function(key){
			bufferIndex[key] -= BufferFlushChunkSize;
		})
		buffer = buffer.slice(BufferFlushChunkSize);
		
		//uses streaming-sync so that we can do further writes before sync returns
		//console.log('pushing sync')
		syncBuffer.push(function(){
			//console.log('...synced')
			var si = indexWriter.writer.entry(indexObj, indexObj.objects.length);
			indexObj.objects.forEach(function(obj){
				segmentsForId[obj.id] = si;
			})
			//console.log('...OL done writing to disk')
		})
		advanceSyncBuffer()
		//isWriting = false;
		writeToDiskIfNecessary()
		//dataWriter.sync()
	}