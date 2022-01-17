function(req, httpRes){

		var viewName = req.params.viewName
		var syncId = parseInt(req.params.syncId)
		var viewSchema = schema[viewName]
		var params = serviceModule.parseParams(req.params.params, viewSchema)
		_.assert(params != null)
		_.assert(params !== 'null')
		_.assertDefined(params)
		
		//var syncHandle = syncHandles[syncId]
		
		console.log('paramsStr: ' + req.params.params)
		console.log('params: ' + JSON.stringify(params))

		service.getViewFiles(viewName, params, function(snapshotIds, paths, lastSeenVersionId){
			_.assertInt(lastSeenVersionId)
			
			var res = [];
		
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
				lastId: lastSeenVersionId
			}
			if(req.user.id) vals.userId = req.user.id

			var data = JSON.stringify(vals)
			
			data = new Buffer(data)
			httpRes.setHeader('Content-Type', 'application/json');
			httpRes.setHeader('Content-Length', data.length);
			httpRes.end(data)
		});
	}