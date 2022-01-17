function includeObjectCb(id, editId){
					_.assertInt(id)
					_.assert(id >= 0)
					if(alreadySent[id]){
						return;
					}else{
						console.log(syncId + ' including object: ' + id + ' editId: ' + editId)
						//TODO buffer for streaming all the edits for the object and any objects it depends on
						var pointer = {got: false, edits: []}
						sentBuffer.push(pointer)
						_.assertInt(editId)
						_.assertInt(id)
						objectState.streamObjectState(alreadySent, id, -1, editId,/*editId, -1,*/ function(id, objEditsBuffer){
							if(alreadySent[id]) return
							
							alreadySent[id] = true
							_.assertBuffer(objEditsBuffer)
							pointer.edits.push({id: id, edits: objEditsBuffer})
							
							/*if(editId !== -1 && obj.meta.editId > editId){
								throw new Error('internal error, editId of object is too recent: ' + obj.meta.editId + ' > ' + editId)
							}*/

							/*pointer.edits.push({
								op: 'objectSnap', 
								edit: {value: {type: obj.meta.typeCode, object: obj}},
								editId: editId,
								id: -1,
								path: []
							})*/
							/*broadcaster.output.listenByObject(id, function(subjTypeCode, subjId, typeCode, id, path, op, edit, syncId, editId){
								//cb(typeCode, id, path, op, edit, syncId, editId)
								var e = {typeCode: typeCode, id: id, path: path, op: op, edit: edit, syncId: syncId, editId: editId}
								if(sentBuffer.length > 0){
									sentBuffer.push(e)
								}else{
									listenerCb(e)
								}
							})*/
						}, function(){
							pointer.got = true
							advanceSentBuffer()
						})
						return;
					}				
				}