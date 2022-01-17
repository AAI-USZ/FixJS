function setupBasedOnSchema(schema){
		console.log('setting up')
		
		handle.schema = schema
		exes = shared.makeExes(schema);
		fp = fparse.makeFromSchema(exes.editSchema)
		deser = exes.responses.binary.stream.makeReader(reader);
		w = exes.client.binary.stream.makeWriter(1024*1024, {
			write: function(buf){
				client.write(buf);
			},
			end: function(){
			}
		});
		
		defaultSyncHandle = makeSyncHandle(syncId)
		syncListenersBySyncId[syncId] = {edit: defaultChangeListener, object: defaultObjectListener}

		flushIntervalHandle = setInterval(doFlush, 20)
	}