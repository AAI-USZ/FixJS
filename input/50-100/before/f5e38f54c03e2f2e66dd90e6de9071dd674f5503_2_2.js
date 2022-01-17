function sendObject(e, ob){
			_.assertBuffer(ob.edits)
			ws.write('sending object: ' + ob.id+'\n')
			ob.destinationSyncId = e.syncId
			w.updateObject(ob);
		}