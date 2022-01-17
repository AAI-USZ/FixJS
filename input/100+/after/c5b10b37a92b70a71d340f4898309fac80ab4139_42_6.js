function(e){
				var updater = sendEditUpdate.bind({}, e)
				var objectUpdater = sendObject.bind(undefined, e)
				var syncId = s.beginSync(updater, objectUpdater);
				e.syncId = syncId
				updaters[syncId] = updater
				//console.log('writing new sync id: ' + syncId + ' }				w.newSyncId({requestId: e.requestId, syncId: syncId});
				w.flush();
			},
