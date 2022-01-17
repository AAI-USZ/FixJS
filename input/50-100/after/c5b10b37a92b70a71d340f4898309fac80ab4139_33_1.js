function translateTemporary(temp, syncId){
		_.assertInt(temp)
		_.assertInt(syncId)
		_.assert(temp < -1)
		var real = temporaryIdsBySync[syncId].temporaryIds[temp];
		console.log('translating ' + temp + ' -> ' + real + ' (' + syncId + ')')
		console.log(JSON.stringify(temporaryIdsBySync[syncId]))
		_.assertInt(real)
		return real;
	}