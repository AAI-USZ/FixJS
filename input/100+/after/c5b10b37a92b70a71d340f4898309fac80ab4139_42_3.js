function sendEditUpdate(e, up){
			_.assertLength(arguments, 2)
			_.assertInt(up.typeCode)
			
			ws.write('sending update: ' + JSON.stringify(up)+'\n')
			//console.log(new Error().stack)
			//if(_.isInt(up.id)) _.assert(up.id >= 0)
			if(w === undefined){
				throw new Error('got update after already disconnected')
			}

			var editKey = up.id+'|'+up.editId+up.op+JSON.stringify(up.path)

			if(alreadySentEdit[editKey]){
				ws.write('already sent edit: ' + editKey + '\n')
				return
			}
			
			alreadySentEdit[editKey] = true
			
			if(this.currentSyncId !== up.syncId){
				this.currentSyncId = up.syncId
				sendUpdate('setSyncId', {syncId: up.syncId}, -1, up.editId, e.syncId)					
			}
			_.assertArray(up.path)


			if(up.id !== -1){
				if(currentResponseId !== up.id){
					if(_.isString(up.id)){
						sendUpdate('selectTopViewObject', {id: up.id}, -1, up.editId, e.syncId)					
					}else{
						sendUpdate('selectTopObject', {id: up.id}, -1, up.editId, e.syncId)					
					}
				}
				currentResponseId = up.id
				
				_.assertDefined(up.id)
				
				var pathUpdater = pathUpdaters[up.id]
				if(pathUpdater === undefined) pathUpdater = pathUpdaters[up.id] = shared.makePathStateUpdater(appSchema, up.typeCode)
			
				console.log('updating to path ' + JSON.stringify(up.path))
				pathUpdater(up.path, function(op, edit){
					console.log('sending update: ' + JSON.stringify([op, edit]))
					sendUpdate(op, edit, -1, up.editId, e.syncId)					
				}, up)
				console.log('...done updating to path ' + JSON.stringify(up.path))
				console.log('sending actual: ' + JSON.stringify([up.op, up.edit]))
			}
			
			
			sendUpdate(up.op, up.edit, up.syncId, up.editId, e.syncId)
			
		}