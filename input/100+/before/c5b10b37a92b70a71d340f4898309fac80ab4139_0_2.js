function getView(dbSchema, cc, st, type, params, syncId, cb){
	_.assertInt(syncId)

	_.assertFunction(cb)
	
	_.assertArray(params);
	var paramsStr = JSON.stringify(params);
	
	//console.log(require('util').inspect(st));
	_.assertInt(st.code);
	
	cc.getSnapshots({typeCode: st.code, params: paramsStr}, function(res){
		var snapshotIds = res.snapshotVersionIds;
		//console.log(JSON.stringify(snapshotIds));
		for(var i=0;i<snapshotIds.length;++i){
			_.assertInt(snapshotIds[i]);
		}
		cc.getAllSnapshots({typeCode: st.code, params: paramsStr, snapshotVersionIds: snapshotIds}, function(snapshotsRes){
		
			//cc.makeSyncId(function(syncId){
				var snapshots = snapshotsRes.snapshots;
				if(snapshots === undefined){
					cb();
					return;
				}
			
				var snapshot = mergeSnapshots(snapshots);
				//console.log('got snapshot: ' + JSON.stringify(snapshot));

				//TODO: cache/reuse sync apis?
				//TODO: they would need to have different syncIds though...
			
				var api;
				function readyCb(e){
					//_.assertInt(e.syncId);
					cb(api.getRoot());
				}
			
				var key = st.isView ? st.code+':'+JSON.stringify(params) : params;
			
				var wrapper = {};
				_.extend(wrapper, cc);
				//TODO should the client maintain the current typeCode,id,path
				//via edits, rather than passing them with the persistEdit call
				wrapper.persistEdit = function(id, path, op, edit, syncId){
					
					cc.persistEdit({id: id, path: JSON.stringify(path), edit: {type: op, object: edit}, syncId: syncId}, function(response){
						if(op === 'make'){
							//this is a special case since we are the originating party
							//TODO require all creation to be via "add to view set" semantics?
							edit.obj.object.meta.id = response.id;
							console.log('calling change listener specially: ' + JSON.stringify([id, path, op, edit, syncId, edit.obj.object.meta.editId]));
							//_.assert(id >= 0)
							_.assert(response.id >= 0)
							api.changeListener(id, path, op, edit, syncId, edit.obj.object.meta.editId);
						}
					});
					//console.log('op: ' + op);
				}
			
				api = syncApi.make(dbSchema, wrapper, snapshot, st.code, key);
				api.setEditingId(syncId);
				
				_.assertFunction(api.changeListener);
				function changeListenerWrapper(e){
					//_.assertInt(typeCode);
					_.assertLength(arguments, 1);
					var id = e.id
					var path = JSON.parse(e.path)
					var op = e.edit.type;
					var edit = e.edit.object;
					var syncId = e.syncId;
					var editId = e.editId;
					_.assertString(op);
					_.assert(_.isString(id) || _.isInt(id));
					console.log('tcpserver sending change: ' + JSON.stringify(e))
					api.changeListener(id, path, op, edit, syncId, editId);
				}
				var req = {typeCode: st.code, params: JSON.stringify(params), latestSnapshotVersionId: snapshot.latestVersionId}
				cc.beginSync(req, changeListenerWrapper, readyCb);
			//})

		});
	});
}