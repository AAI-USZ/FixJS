function sendObject(e, ob){
			_.assertBuffer(ob.edits)
			ws.write('sending object: ' + ob.id+'\n')
			console.log('sending object: ' + ob.id)
			ob.destinationSyncId = e.syncId
			w.updateObject(ob);
		}