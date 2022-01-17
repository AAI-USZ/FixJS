function translateTemporaryId(temp, syncId){
		_.assertInt(syncId)
		
		var real = temporaryIdsBySync[syncId].temporaryIds[temp];
		_.assertInt(real)
		return real;
	}