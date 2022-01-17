function(id, objEditsBuffer){
							//if(alreadySent[id]) return
							
							alreadySent[id] = true
							_.assertBuffer(objEditsBuffer)
							pointer.edits.push({id: id, edits: objEditsBuffer})

						}