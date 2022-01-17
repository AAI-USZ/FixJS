function(schema, dataDir, cb){
	_.assertLength(arguments, 3);
	
	//schema.name = appName;
	
	var serverUid;
	
	function makeDirIfNecessary(cb){
		var p = dataDir + '/minnow_data'
		path.exists(p, function(exists){
			if(!exists){
				fs.mkdir(p, function(err){
					if(err) throw err;
					cb()
				})
			}else{
				cb()
			}
		})
	}
	
	makeDirIfNecessary(function(){
		require('./ol').make(dataDir, schema, _.assureOnce(function(ol){
			console.log('got ol')
			require('./ap').make(dataDir, schema, ol, function(ap, indexing, broadcaster, apClose){
				console.log('got ap')
				_.assertLength(arguments, 4);
				openUid(dataDir, function(uid){
					serverUid = uid
					console.log('got uid')
					var objectState = require('./objectstate').make(schema, ap, broadcaster, ol);
					objectState.setIndexing(indexing)
					load(ap, indexing, objectState, broadcaster, apClose, ol);
				})
			});
		}));
	})

	function load(ap, indexing, objectState, broadcaster, apClose, ol){
		console.log('loading...');
	
		var viewState = viewstate.make(schema, broadcaster, objectState);

		//TODO the ap should initialize the sync handle counter to avoid using the same one multiple times
		//var syncHandleCounter = 1;
	
		function stub(){}
		
		var handle = {
			serverInstanceUid: function(){return serverUid;},

			close: function(cb){
				//m.close();
				var cdl = _.latch(2, function(){
					console.log('closed server')
					cb()
				})
				apClose(cdl)
				ol.close(cdl)
			},
		
			beginSync: function(e, listenerCb, readyCb){
				_.assertFunction(listenerCb);
				_.assertFunction(readyCb);
				
				//console.log('beginning sync')
				
				if(schema._byCode[e.typeCode].isView){
					return viewState.beginSync(e, listenerCb, function(updatePacket){
						//var syncId = syncHandleCounter;
						//++syncHandleCounter;
						console.log('got UPDATE PACKET')
						readyCb(updatePacket);
					});
				}else{
					_.errout('ERROR');
					//broadcaster.output.listenByObject(typeCode, params, listenerCb);
				}
			},
			endSync: function(typeCode, params, listenerCb){
				_.assertInt(typeCode);
				if(schema._byCode[typeCode].isView){
					viewState.endSync(typeCode, params, listenerCb);
				}else{
					_.errout('ERROR');
					//broadcaster.output.stopListeningByObject(typeCode, params, listenerCb);
				}
			},
			persistEdit: function(id, path, op, edit, syncId, cb){
				_.assertLength(arguments, 6);
				_.assertInt(id);
				_.assertInt(syncId);
				_.assertString(op)
				_.assertFunction(cb)
				
				console.log('adding edit: ' + JSON.stringify([id, path, op, edit, syncId]).slice(0, 300))

				objectState.addEdit(id, path, op, edit, syncId, cb);
			},
		
			makeNewSyncId: function(){//TODO really should be called getNewSyncId
				/*var shId = syncHandleCounter;
				++syncHandleCounter;
			*/
				return ap.makeNewSyncId();
			},
		
			getSnapshots: function(e, cb){
				_.assertLength(arguments, 2);
				var typeCode = e.typeCode;
				var params = JSON.parse(e.params);
				
				_.assertInt(typeCode);

				if(schema._byCode[typeCode].isView){
					viewState.getSnapshots(typeCode, params, cb);
				}else{
					_.errout('ERROR')
					//objectState.getSnapshots(typeCode, params, cb);
				}
			},
			getAllSnapshots: function(e, cb){
				_.assertLength(arguments, 2);
				var typeCode = e.typeCode;
				var params = JSON.parse(e.params);
				var snapshotIds = e.snapshotVersionIds;
				_.assertArray(snapshotIds);

				if(schema._byCode[typeCode].isView){
					_.assertArray(params);
					viewState.getAllSnapshotStates(typeCode, params, snapshotIds, cb);
				}else{
					_.errout('ERROR')
					//objectState.getAllSnapshotStates(typeCode, params, snapshotIds, cb);
				}			
			},
			getSnapshot: function(e, cb){
				_.assertLength(arguments, 2);
				
				var typeCode = e.typeCode;
				var params = JSON.parse(e.params)
				var snapshotId = e.latestVersionId;
				var previousId = e.previousVersionId;
				
				_.assert(params.length === schema._byCode[typeCode].viewSchema.params.length);
			
				if(schema._byCode[typeCode].isView){
					_.assertArray(params);
					viewState.getSnapshotState(typeCode, params, snapshotId, previousId, cb);
				}else{
					_.errout('ERROR')
					//objectState.getSnapshotState(typeCode, params, snapshotId, previousId, cb);
				}			
			}
		};
		console.log('cbing')
		cb(handle);
	}
}