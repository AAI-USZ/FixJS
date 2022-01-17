function ensureHasObject(id, sourceEditId){
		_.assertInt(id)
		_.assertInt(sourceEditId)
		if(has[id] === undefined){
			//has[id] = true
			++manyObjectsOut
			//console.log('getting state(' + id + '): ' + manyObjectsOut)

			//gets only edits between the given range
			//TODO set start point to -1 if the first ensure source falls within this snapshots edit interval
			var s = startEditId
			if(startEditId < sourceEditId && (endEditId === -1 || sourceEditId <= endEditId)){
				s = -1
				//console.log('is ' + sourceEditId)
			}else{
				//console.log('not ' + startEditId + ' <= ' + sourceEditId + ' < ' + endEditId)
			}
			objectState.streamObjectState(has, id, s, endEditId, function(id, editsBuffer){
				_.assertLength(arguments, 2)
				//console.log('added object to buffer: ' + id)
				//_.assertInt(manyEdits)
				if(editsBuffer){
					_.assertBuffer(editsBuffer)
					objectEditBuffers.push({id: id, edits: editsBuffer})
				}else{
					console.log('no edits, skipping object entirely: ' + id)
				}
			}, function(){
				--manyObjectsOut
				//console.log('got state(' + id + '): ' + manyObjectsOut)
			})	
		}
	}