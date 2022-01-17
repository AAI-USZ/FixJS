function(id, editsBuffer){
				_.assertLength(arguments, 2)
				//console.log('added object to buffer: ' + id)
				//_.assertInt(manyEdits)
				if(editsBuffer){
					_.assertBuffer(editsBuffer)
					objectEditBuffers.push({id: id, edits: editsBuffer})
				}else{
					console.log('no edits, skipping object entirely: ' + id)
				}
			}