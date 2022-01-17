function getView(dbSchema, cc, st, type, params, syncId, api, beginView, cb){
	_.assertInt(syncId)

	_.assertFunction(cb)
	var listeningSyncId = syncId
	
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
		
			var snapshots = snapshotsRes.snapshots;
			if(snapshots === undefined){
				cb();
				return;
			}
		
			//var snapshot = mergeSnapshots(snapshots);
			console.log('got snapshots: ' + JSON.stringify(snapshots).slice(0,500));

			//TODO: cache/reuse sync apis?
			//TODO: they would need to have different syncIds though...
		
			//var api;
			function readyCb(e){
				//_.assertInt(e.syncId);
				//cb()//.getRoot());
				console.log('ready!!!!!!!!!!!!!!!!!!!!!!!1')
				cb()
			}
			
			snapshots.forEach(function(snapshot){
				console.log('snapshot: ' + JSON.stringify(snapshot).slice(0,500))
				//process.exit(0)
				api.addSnapshot(snapshot)
			})
		
			//var key = st.isView ? st.code+':'+JSON.stringify(params) : params;
		
			//_.errout('TODO')
		
			
			var req = {
				typeCode: st.code, 
				params: JSON.stringify(params), 
				latestSnapshotVersionId: snapshots[snapshots.length-1].endVersion,//snapshot.latestVersionId,
				syncId: syncId
			}
			beginView(req, /*changeListenerWrapper, */readyCb);

		});
	});
}