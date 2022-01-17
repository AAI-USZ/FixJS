function includeObjectCb(id, editId){
					_.assertInt(id)
					_.assert(id >= 0)
					if(alreadySent[id]){
						console.log('already sent: ' + id)
						return;
					}else{
						console.log(syncId + ' including object: ' + id + ' editId: ' + editId)
						//TODO buffer for streaming all the edits for the object and any objects it depends on
						var pointer = {got: false, edits: []}
						sentBuffer.push(pointer)
						_.assertInt(editId)
						_.assertInt(id)
						objectState.streamObjectState(alreadySent, id, -1, editId, function(id, objEditsBuffer){
							//if(alreadySent[id]) return
							
							alreadySent[id] = true
							_.assertBuffer(objEditsBuffer)
							pointer.edits.push({id: id, edits: objEditsBuffer})

						}, function(){
							console.log('---- got')
							pointer.got = true
							advanceSentBuffer()
						})
						return;
					}				
				}