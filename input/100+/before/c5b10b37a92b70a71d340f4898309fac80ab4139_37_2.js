function(typeCode, id, snapshotIds, cb){
			if(snapshotIds.length !== 1 || snapshotIds[0] !== -1) _.errout('TODO implement');
			
			handle.getObjectState(id, function(state){
				if(state === undefined){
					cb();
					return;
				}
				
				var snap = {objects: {}};
				snap.objects[typeCode] = {};
				snap.objects[typeCode][id] = state;
				snap.version = state.meta.editId

				//TODO retrieve FKs in state, include them
			
				cb([snap]);
			});
		}