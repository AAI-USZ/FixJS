function(req, httpRes){

		var viewName = req.params.viewName
		var syncId = parseInt(req.params.syncId)
		var viewSchema = schema[viewName]
		var params = serviceModule.parseParams(req.params.params, viewSchema)
		_.assert(params != null)
		_.assert(params !== 'null')
		_.assertDefined(params)
		
		console.log('paramsStr: ' + req.params.params)
		//service.makeSyncId(function(syncId){
		service.getViewFiles(viewName, params, syncId, function(snapshotIds, paths, lastSeenVersionId){
		
			var res = [];
		
			//vars.snapshotIds = snapshotIds;
			//vars.lastId = lastSeenVersionId;
			//vars.baseTypeCode = viewSchema.code;
			//vars.baseId = vars.baseTypeCode+':'+JSON.stringify(params);
			//vars.syncId = syncId;
			
			clientInfoBySyncId[syncId] = [viewSchema.code, params, snapshotIds];

			for(var i=0;i<paths.length;++i){
				var p = paths[i];
				res.push(snapPath + p);
			}
			
			var vals = {
				schemaUrl: schemaUrl, 
				snapUrls: res, 
				syncId: syncId, 
				baseTypeCode: viewSchema.code, 
				lastId: lastSeenVersionId,
				
			}
			if(req.user.id) vals.userId = req.user.id

			var data = JSON.stringify(vals)
			
			httpRes.setHeader('Content-Type', 'application/json');
			httpRes.setHeader('Content-Length', data.length);
			httpRes.end(data)
		});
		//});
	}