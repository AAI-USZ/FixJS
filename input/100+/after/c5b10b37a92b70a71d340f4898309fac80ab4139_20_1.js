function(viewName, params, vars, cb){
			_.assertLength(arguments, 4);
			
			var viewCode = minnowClient.schema[viewName].code
			service.getViewFiles(viewName, params, function(snapshotIds, paths, lastSeenVersionId){
				
				if(arguments.length === 0){
					cb();
				}else{
					var res = [];
				
					vars.snapshotIds = snapshotIds;
					vars.lastId = lastSeenVersionId;
					vars.baseTypeCode = viewCode;
					vars.baseId = vars.baseTypeCode+':'+JSON.stringify(params);
					vars.applicationName = appName
					vars.mainViewParams = params
					
					//vars.minnowSocketPort = port

					//clientInfoBySyncId[syncId] = [vars.baseTypeCode, params, snapshotIds];
				
					for(var i=0;i<paths.length;++i){
						var p = paths[i];
						res.push(snapPath + p);
					}
				
					res.push(schemaUrl);
				
					cb(vars, res);
				}
			});
		}