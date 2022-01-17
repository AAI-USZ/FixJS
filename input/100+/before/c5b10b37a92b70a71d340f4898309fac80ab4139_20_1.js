function(snapshotIds, paths, syncId, lastSeenVersionId){
			
				if(arguments.length === 0){
					cb();
				}else{
					var res = [];
				
					vars.snapshotIds = snapshotIds;
					vars.lastId = lastSeenVersionId;
					vars.baseTypeCode = minnowClient.schema[viewName].code;
					vars.baseId = vars.baseTypeCode+':'+JSON.stringify(params);
					vars.syncId = syncId;
					
					vars.minnowSocketPort = port

					clientInfoBySyncId[syncId] = [vars.baseTypeCode, params, snapshotIds];
				
					for(var i=0;i<paths.length;++i){
						var p = paths[i];
						res.push(snapPath + p);
					}
				
					res.push(schemaUrl);
				
					cb(vars, res);
				}
			}