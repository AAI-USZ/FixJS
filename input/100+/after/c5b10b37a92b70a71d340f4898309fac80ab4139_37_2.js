function(id, op, path, edit, syncId, computeTemporary, cb){
			_.assertLength(arguments, 7);
			if(op !== 'make') _.assertInt(id);
			_.assertInt(syncId);
			_.assertString(op)
			//TODO support merge models
			
			//TODO merge path updates with actual edit stream
			
			/*
			ap.persistEdit(id, op, edit, syncId, computeTemporary, function(e){
				var editId = e.editId
				_.assertInt(editId)
				var subs = subscriptions[id]
				//console.log('ooking for subs: ' + id + ' ' + JSON.stringify(Object.keys(subscriptions)))
				if(subs){
					subs.forEach(function(s){
						console.log('sending to subscription')
						//s(typeCode, id, path, op, edit, syncId, editId)
						s({typeCode: typeCode, id: id, op: op, edit: edit, syncId: syncId, editId: editId})
					})
				}
				cb(e)				
			});
			*/
			if(op === 'make'){
				ap.persistEdit(-1, -1, [], op, edit, syncId, computeTemporary, function(e){
					var editId = e.editId
					_.assertInt(editId)
					var subs = subscriptions[id]
					//console.log('ooking for subs: ' + id + ' ' + JSON.stringify(Object.keys(subscriptions)))
					if(subs){
						subs.forEach(function(s){
							console.log('sending to subscription')
							//s(typeCode, id, path, op, edit, syncId, editId)
							s({typeCode: typeCode, id: id, op: op, edit: edit, syncId: syncId, editId: editId})
						})
					}
					cb(e)				
				});
			}else{
				if(id < -1){
					id = ap.translateTemporaryId(id, syncId)
				}
				_.assert(id > 0)
				pm(id, path, op, edit, syncId, computeTemporary, function(e){
					var editId = e.editId
					_.assertInt(editId)
					var subs = subscriptions[id]
					//console.log('ooking for subs: ' + id + ' ' + JSON.stringify(Object.keys(subscriptions)))
					if(subs){
						subs.forEach(function(s){
							console.log('sending to subscription')
							//s(typeCode, id, path, op, edit, syncId, editId)
							s({typeCode: typeCode, id: id, op: op, edit: edit, syncId: syncId, editId: editId})
						})
					}
					cb(e)				
				})
			}
		}