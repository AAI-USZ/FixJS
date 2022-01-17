function(schema, cc){
	var handle = {
		
		makeSyncId: function(cb){
			cc.makeSyncId(cb);
		},
		//returns the paths for the snapshots for the view
		getViewFiles: function(viewName, params, syncId, cb){
			_.assertLength(arguments, 4)
			_.assertDefined(params)
			
			var s = schema[viewName];
			if(s === undefined) _.errout('unknown view: ' + viewName)
			
			var viewCode = s.code;
			
			console.log('getting snapshots: ' + JSON.stringify(params))
			var getMsg = {typeCode: viewCode, params: JSON.stringify(params)}
			_.assert(getMsg.params != 'null')
			cc.getSnapshots(getMsg, _.once(function(e){

				var snapshotIds = e.snapshotVersionIds;
				var lastVersionId = e.lastVersionId;

				if(arguments.length === 0){
					cb();
				}else{
					var key;

					if(s.isView){
						key = '';
						for(var i=0;i<params.length;++i){
							if(i > 0) key += ';';
							key += querystring.escape(params[i]);
						}
					}else{
						key = params+'';
					}
				
					var paths = [];
					for(var i=0;i<snapshotIds.length;++i){
						var id = snapshotIds[i];
						var previousId = i > 0 ? snapshotIds[i-1] : -1;
						paths.push(cc.serverInstanceUid() + '/' + viewCode + '/' + id + '/' + previousId + '/' + key);
					}
				
					//cc.makeSyncId(function(syncId){
						cb(snapshotIds, paths, lastVersionId);
					//});
				}
			}));
		},
		
		//returns the javascript string content of the view file
		getViewFile: function(viewCode, snapshotId, previousId, paramsStr, cb){

			handle.getViewJson(viewCode, snapshotId, previousId, paramsStr, function(json){
				cb('gotSnapshot(' + JSON.stringify(json) + ');\n');
			})
		},
		getViewJson: function(viewCode, snapshotId, previousId, paramsStr, cb){
			var s = schema._byCode[viewCode];

			var parsedParams = doParseParams(paramsStr, s)
			//console.log('paramsStr: ' + paramsStr);
			
			//console.log('got blah: ' + JSON.stringify(params));

			
			var snapReq = {typeCode: viewCode, params: JSON.stringify(parsedParams), latestVersionId: snapshotId, previousVersionId: previousId};
			cc.getSnapshot(snapReq, function(response){
				response.snap.id = snapshotId;
				cb(response.snap)
			});
		},
		
		beginSync: function(viewCode, params, snapshotId, cb, readyCb){
			_.assertFunction(readyCb);
			var req = {typeCode: viewCode, params: JSON.stringify(params), latestSnapshotVersionId: snapshotId};
			cc.beginSync(req, cb, readyCb);
		},
		endSync: function(syncId){
			_.assertLength(arguments, 1);
			_.assertInt(syncId)
			cc.endSync({syncId: syncId});
		},
		
		processEdit: function(id, path, op, edit, syncId){
			_.assertLength(arguments, 5);
			_.assertInt(syncId);
			_.assertInt(id);
			//console.log(arguments);
			cc.persistEdit({id: id, path: JSON.stringify(path), edit: {type: op, object: edit}, syncId: syncId}, function(result){
				//_.errout('TODO')
				//TODO notify the source sync handle of the result
			});
		}
	};
	return handle
}