function(snapshotsRes){
		
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

		}