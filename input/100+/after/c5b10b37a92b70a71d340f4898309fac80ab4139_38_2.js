function(id, startEditId, endEditId, cb){//TODO optimize away
			_.assertLength(arguments, 4)
			_.assertInt(startEditId)
			_.assertInt(endEditId)
			_.assertInt(id)
			_.assert(id >= 0)
			
			//console.log('getting ' + id + ' ' + startEditId + ' - ' + endEditId)

			var index = bufferIndex[id];
			if(index !== undefined){
				var bi = buffer[index]

				var actual = []
				bi.data.forEach(function(e){
					//console.log(JSON.stringify(e).slice(0,300))
					_.assertInt(e.editId)
					if(startEditId < e.editId && (endEditId === -1 || e.editId <= endEditId)){
						//console.log('adding: ' + JSON.stringify(e))
						actual.push(e)
					}else{
						//console.log('skipping ' + e.editId)
					}
				})
				
				//console.log('(' + bi.data.length + ')serializing ' + actual.length + ' between ' + startEditId + ' and ' + endEditId)
				//_.assert(actual.length > 0)
				if(actual.length > 0){
					var buf = serializeEdits(fp, actual)
					cb(buf)
				}else{
					cb()
				}
				return
			}
			_.errout('TODO: ' + id + ' ' + index)
		}