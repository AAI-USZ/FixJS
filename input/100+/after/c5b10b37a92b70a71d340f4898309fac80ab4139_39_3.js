f	_.assertLength(arguments, 5);
	
	//schema.name = appName;

	var serverUid;
	
	function makeDirIfNecessary(cb){
		var p = dataDir + '/minnow_data'
		exists(p, function(exists){
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
			require('./ap').make(dataDir, schema, ol, function(ap, broadcaster, apClose){
				console.log('got ap')
				_.assertLength(arguments, 3);
				openUid(dataDir, function(uid){
					serverUid = uid
					console.log('got uid')
					var objectState = require('./objectstate').make(schema, ap, broadcaster, ol);
					//objectState.setIndexing(indexing)
					load(ap, objectState, broadcaster, apClose, ol);
				})
			});
		}));
	})

	function load(ap, objectState, broadcaster, apClose, ol){
		//console.log('loading...');
	
		var viewState = viewStateModule.make(schema, globalMacros, broadcaster, objectState);

		//TODO the ap should initialize the sync handle counter to avoid using the same one multiple times
		//var syncHandleCounter = 1;
	
		function stub(){}
		
		var listenerCbs = {}
		
		var handle = {
			serverInstanceUid: function(){return serverUid;},

			close: function(cb){
				//m.close();
				var cdl = _.latch(2, function(){
					console.log('closed server')
					cb()
				})
				apClose(function(){console.log('closed ap');cdl()})
				ol.close(function(){console.log('closed ol');cdl()})
			},
		
			beginView: function(e, readyCb){
				//_.assertFunction(listenerCb);
				_.assertLength(arguments, 2)
				_.assertFunction(readyCb);
				
				var listenerCb = listenerCbs[e.syncId]
				_.assertFunction(listenerCb)
				console.log('beginView: ' + JSON.stringify(e))
				return viewState.beginView(e, listenerCb.seq, listenerCb, function(updatePacket){
						readyCb(updatePacket);
				})
			},
			persistEdit: function(id, op, path, edit, syncId, computeTemporaryId, cb){//(typeCode, id, path, op, edit, syncId, cb){
				_.assertLength(arguments, 7);
				//_.assertInt(id);
				_.assertInt(id)
				_.assertString(op)				
				_.assertArray(path)
				_.assertInt(syncId);
				_.assertFunction(cb)
				
				console.log('adding edit: ' + JSON.stringify([id, path, op, edit, syncId]).slice(0, 300))
				
				if(op === 'make'){
					objectState.addEdit(id, op, path, edit, syncId, computeTemporaryId, function(res){
						//console.log('args: ' + JSON.stringify(arguments))
						//console.log('in MAKE CALLBACK #$%)@#$@#$)(#@$')
						//console.log('subscribing for syncId ' + syncId)
						var listenerCb = listenerCbs[syncId];						
						listenerCb.seq.subscribeToObject(res.id)
						cb(res)
					});
				}else{
					//objectState.addEdit(typeCode, id, path, op, edit, syncId, cb);
					objectState.addEdit(id, op, path, edit, syncId, computeTemporaryId, cb);
				}
			},
		
			beginSync: function(listenerCb, objectCb){
				_.assertFunction(listenerCb)
				_.assertFunction(objectCb)
				var syncId = ap.makeNewSyncId();
				
				var alreadySent = {}
				var sentBuffer = []
				function advanceSentBuffer(){
					while(true){
						if(sentBuffer.length === 0) return
						var e = sentBuffer[0]
						if(e.got === true){
							e.edits.forEach(function(e){
								//listenerCb(e)
								_.assertBuffer(e.edits)
								//console.log('e: ' + JSON.stringify(e).slice(0,300))
								//console.log('sending object: ' + JSON.stringify(e).slice(0,300))
								objectCb(e)
							})
							sentBuffer.shift()
							//advanceSentBuffer()
						}else if(e.got === false){
							return;
						}else{
							_.assert(e.id === -1 || alreadySent[e.id])
							console.log('sending edit: ' + JSON.stringify(e))
							listenerCb(e)
							sentBuffer.shift()
						}
					}
				}
				function includeObjectCb(id, editId){
					_.assertInt(id)
					_.assert(id >= 0)
					if(alreadySent[id]){
						return;
					}else{
						console.log(syncId + ' including object: ' + id + ' editId: ' + editId)
						//TODO buffer for streaming all the edits for the object and any objects it depends on
						var pointer = {got: false, edits: []}
						sentBuffer.push(pointer)
						_.assertInt(editId)
						_.assertInt(id)
						objectState.streamObjectState(alreadySent, id, -1, editId,/*editId, -1,*/ function(id, objEditsBuffer){
							if(alreadySent[id]) return
							
							alreadySent[id] = true
							_.assertBuffer(objEditsBuffer)
							pointer.edits.push({id: id, edits: objEditsBuffer})
							
							/*if(editId !== -1 && obj.meta.editId > editId){
								throw new Error('internal error, editId of object is too recent: ' + obj.meta.editId + ' > ' + editId)
							}*/

							/*pointer.edits.push({
								op: 'objectSnap', 
								edit: {value: {type: obj.meta.typeCode, object: obj}},
								editId: editId,
								id: -1,
								path: []
							})*/
							/*broadcaster.output.listenByObject(id, function(subjTypeCode, subjId, typeCode, id, path, op, edit, syncId, editId){
								//cb(typeCode, id, path, op, edit, syncId, editId)
								var e = {typeCode: typeCode, id: id, path: path, op: op, edit: edit, syncId: syncId, editId: editId}
								if(sentBuffer.length > 0){
									sentBuffer.push(e)
								}else{
									listenerCb(e)
								}
							})*/
						}, function(){
							pointer.got = true
							advanceSentBuffer()
						})
						return;
					}				
				}
				function listenerCbWrapper(e){//(typeCode, id, path, op, edit, syncId, editId){
					_.assertLength(arguments, 1);
					_.assertInt(e.typeCode)
					console.log('e: ' + JSON.stringify(e))
					//console.log(new Error().stack)
					if(sentBuffer.length > 0){
						sentBuffer.push(e)
					}else{
						listenerCb(e)
					}
				}

				listenerCbs[syncId] = listenerCbWrapper

				var seq = viewSequencer.make(schema, objectState, broadcaster, includeObjectCb, listenerCbWrapper, syncId)
				listenerCbWrapper.seq = seq
				
				return syncId
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
				}			
			}
		};
		//console.log('cbing')
		cb(handle);
	}
}
