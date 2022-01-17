function(appName, schema, local, minnowClient, authenticator, clientInfoBySyncId){
	//_.assertLength(arguments, 3)
	_.assertString(appName)
	
	authenticator = authenticator || function(){return true;}
	
	var service = serviceModule.make(minnowClient.schema, minnowClient.internalClient);
	
	var snapPath = '/mnw/snapsjson/' + appName + '/';
	
	var schemaUrl;
	app.serveJavascript(exports, appName, function(ccc){
		_.assertFunction(ccc);
		schemaUrl = ccc(JSON.stringify(minnowClient.schema));
	});

	app.get(exports, '/mnw/schema/'+appName, authenticator, function(req, httpRes){
		//httpRes.redirect(schemaUrl)
	//	httpRes.send(
		var json = JSON.stringify(schemaUrl)
		var data = new Buffer(json)
		httpRes.setHeader('Content-Type', 'application/json');
		httpRes.setHeader('Content-Length', data.length);
		httpRes.end(data)
	})
	
	app.get(exports, '/mnw/meta/'+appName+'/:syncId/:viewName/:params', authenticator, function(req, httpRes){

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
	})
	
	app.get(exports, snapPath + ':serverUid/:viewId/:snapshotId/:previousId/:params', authenticator, function(req, res){

		var snapshotId = parseInt(req.params.snapshotId);
	
		//we shouldn't 304 on the terminal snapshot since it may get bigger (and we'd rather send the data that way 
		//than through updates
		if(snapshotId === -1 || !matterhorn.do304IfSafe(req, res)){
	
			var viewId = parseInt(req.params.viewId);
			var previousId = parseInt(req.params.previousId);
			var paramStr = req.params.params;

			var key = viewId+':'+paramStr+':'+snapshotId+':'+previousId;
			//TODO cache zipped snapshots
		
			service.getViewJson(viewId, snapshotId, previousId, paramStr, function(json){

				var jsStr = JSON.stringify(json)
							
				zlib.gzip(jsStr, function(err, data){
					if(err) _.errout(err);
				
					sendData(res, data);
				});
			});
		}
	});
	
	
	/*
	var clientInfoBySyncId = {};
	
	function syncListener(connectionSyncId, e){
		_.assertLength(arguments, 2);
		
		console.log('got e: ' + JSON.stringify(e).slice(0, 300));
		
		var id = e.id;
		var path = JSON.parse(e.path)
		var op = e.edit.type;
		var edit = e.edit.object;
		var syncId = e.syncId;
		var editId = e.editId;
		
		_.assertString(op)
		
		console.log('sending socket.io message for sync ' + syncId + ', editId: ' + editId);
		if(!(_.isInt(syncId))){
			_.errout('invalid syncId: ' + syncId);
		}
		_.assertArray(path);
		for(var i=0;i<path.length;++i){
			_.assertDefined(path[i]);
		}

		var msg = [id, path, op, edit, syncId];

		sendToClient(connectionSyncId, msg)
	}

	//used to get updates for a sync handle
	app.post(exports,  '/mnw/xhr/update/' + appName + '/:syncId', authenticator, function(req, res){

		var msgs = req.body
		var syncId = parseInt(req.params.syncId)
		
		
		function doViewSetup(msg){
			var snapshotId = parseInt(msg.snapshotVersion);
			
			console.log(JSON.stringify(Object.keys(schema)))
			var viewCode = schema[msg.viewName].code
			_.assertInt(viewCode)
			
			var viewReq = {
				syncId: syncId,
				typeCode: viewCode,
				params: JSON.stringify(msg.params),
				latestSnapshotVersionId: msg.version//snapshotIds[snapshotIds.length-1]
			}
			syncHandles[syncId].beginView(viewReq, function(e){
				console.log('BEGAN VIEW')
				sendToClient(syncId, {type: 'ready', uid: msg.uid, data: JSON.parse(e.updatePacket)})
			})
		}

		var syncHandle = syncHandles[syncId]
		if(syncHandle === undefined) _.errout('no known sync handle for syncId: ' + syncId)
		for(var i=0;i<msgs.length;++i){
			var msg = msgs[i]
			console.log('msg: ' + JSON.stringify(msg).slice(0, 300))
			if(msg.type === 'setup'){
				doViewSetup(msg)
			}else{
				msg = msg.data

				var persistRequest = {
					typeCode: msg.typeCode,
					id: msg.id,
					path: JSON.stringify(msg.path),
					edit: msg.edit,
					op: msg.op,
					syncId: syncId
				}
				syncHandle.persistEdit(persistRequest, function(){
					//TODO?
				});
			}
		}

	    res.setHeader('Content-Type', 'text/plain');
	    res.setHeader('Content-Length', '0');

		res.end()
	})

	function sendToClient(syncId, msg){
		if(longPollCaller[syncId]){
			longPollCaller[syncId](msg)
		}else{
			if(waitingForLongPoll[syncId] === undefined) waitingForLongPoll[syncId] = []
			waitingForLongPoll[syncId].push(msg)
		}
	}
	var waitingForLongPoll = {}
	var longPollCaller = {}
	//long poll connections to send update server->client for a sync handle
	//TODO if no longpoll connection is made for a syncId for awhile, delete it
	app.get(exports, '/mnw/xhr/longpoll/' + appName + '/:syncId', authenticator, function(req, res){
		var syncId = parseInt(req.params.syncId)
		
		function sendContent(content){
		    res.setHeader('Content-Type', 'application/json');
		    res.setHeader('Content-Length', content.length);
			res.end(content)
		}
		
		var msgsToSend = waitingForLongPoll[syncId] || []
		if(msgsToSend.length > 0){
		   sendContent(JSON.stringify(msgsToSend))
			waitingForLongPoll[syncId] = []
		}else{
			longPollCaller[syncId] = function(msg){
				sendContent(JSON.stringify([msg]))
				longPollCaller[syncId] = undefined;
			}
		}
	})*/
	
	console.log('minnow xhr service set up');
	
}