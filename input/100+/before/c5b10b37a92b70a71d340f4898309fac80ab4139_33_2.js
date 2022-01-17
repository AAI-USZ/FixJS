function mapTemporaryId(temp, real, syncId){
		_.assertInt(syncId)
		var te = temporaryIdsBySync[syncId]
		if(te === undefined) te = temporaryIdsBySync[syncId] = {mappedIds: {}, temporaryIds: {}}
		
		if(te.mappedIds[real] !== undefined){
			_.errout('real id already mapped: ' + real);
		}
		if(te.temporaryIds[temp] !== undefined){
			_.errout('temporary id already mapped ' + temp + ' -> ' + temporaryIds[temp] + ', now being mapped to ' + real);
		}
		te.temporaryIds[temp] = real;
		te.mappedIds[real] = true;
	}