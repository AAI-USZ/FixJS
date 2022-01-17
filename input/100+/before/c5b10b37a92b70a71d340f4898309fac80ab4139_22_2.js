function(appName, schema, local, minnowClient, authenticator){
	//_.assertLength(arguments, 3)
	_.assertString(appName)
	
	authenticator = authenticator || function(){return true;}
	
	var service = serviceModule.make(minnowClient.schema, minnowClient.internalClient);
	
	var snapPath = '/mnw/snapsjson/' + appName + '/';
	
	//var appName = pathModule.basename(pathModule.dirname(app.module.filename))
	//app.js(exports, 'all', 'xhr');
	
	var schemaUrl;
	app.serveJavascript(exports, appName, function(ccc){
		_.assertFunction(ccc);
		schemaUrl = ccc(JSON.stringify(minnowClient.schema));
	});

	app.get(exports, '/mnw/sync', authenticator, function(req, httpRes){
		minnowClient.makeSyncId(function(syncId){
			var data = JSON.stringify({syncId: syncId})
			httpRes.setHeader('Content-Type', 'application/json');
			httpRes.setHeader('Content-Length', data.length);
			httpRes.end(data)
		})
	})

	app.get(exports, '/mnw/meta/'+appName+'/:syncId/:viewName/:params', authenticator, function(req, httpRes){

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
	
	var clientInfoBySyncId = {};
	//var isConnectedBySyncId = {}

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
		console.log('sending socket.io message for sync ' + editId);
		if(!(_.isInt(syncId))){
			_.errout('invalid syncId: ' + syncId);
		}
		_.assertArray(path);
		for(var i=0;i<path.length;++i){
			_.assertDefined(path[i]);
		}
		//if(syncId > 100) _.errout('false sync id');
		var msg = [id, path, op, edit, syncId];
		//client.send(msgStr);
		/*if(msgStr.length < 1000) console.log('msg: ' + msgStr);
		else{
			var sm = msgStr;
			sm = msgStr.substr(0, 100) + '...' + msgStr.substr(msgStr.length-100);
			console.log('msg: ' + sm);
		}*/
		sendToClient(connectionSyncId, msg)
	}
	//function readyCb(connectionSyncId){
	//	sendToClient(connectionSyncId, 'ready');
	//}
	//used to get updates for a sync handle
	app.post(exports,  '/mnw/xhr/update/' + appName + '/:syncId', authenticator, function(req, res){

		var msgs = req.body
		var syncId = parseInt(req.params.syncId)
		
		function doViewSetup(msg){
			var snapshotId = parseInt(msg.snapshotVersion);
			
			//isConnectedBySyncId[syncId] = true

			var clientInfo = clientInfoBySyncId[syncId];
			var viewCode = clientInfo[0];
			var params = clientInfo[1];
			var snapshotIds = clientInfo[2];
	
			service.beginSync(viewCode, params, snapshotId, syncListener.bind(undefined, syncId), function(e){
				var updatePacket = JSON.parse(e.updatePacket)
				_.assertArray(updatePacket)
				sendToClient(syncId, {type: 'ready', uid: msg.uid, data: e.updatePacket})
			});
		}

		for(var i=0;i<msgs.length;++i){
			var msg = msgs[i]
			console.log('msg: ' + JSON.stringify(msg).slice(0, 300))
			if(msg.type === 'setup view'/* && !isConnectedBySyncId[syncId]*/){
				doViewSetup(msg)
			}else{
				msg = msg.data
				_.assertLength(msg, 4);
				service.processEdit(msg[0], msg[1], msg[2], msg[3], syncId);
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
	})
	
	/*
	var socketServer = require('http').createServer(function (req, res) {});
	var io = require('socket.io').listen(socketServer);
	
	io.configure(function(){
		io.set('log level', 1);
	});
	
	io.sockets.on('connection', function(client){ 
		console.log('got client connection');
		var waitingForSyncId = true;

		var viewCode;
		var params;
		var snapshotIds;
		
		var syncId;
		
		var clientHasDisconnected = false;
		
		function syncListener(e){
			_.assertLength(arguments, 1);
			
			console.log('got e: ' + JSON.stringify(e));
			
			var id = e.id;
			var path = JSON.parse(e.path)
			var op = e.edit.type;
			var edit = e.edit.object;
			var syncId = e.syncId;
			var editId = e.editId;
			
			_.assertString(op)
			console.log('sending socket.io message for sync ' + editId);
			if(!(_.isInt(syncId))){
				_.errout('invalid syncId: ' + syncId);
			}
			_.assertArray(path);
			for(var i=0;i<path.length;++i){
				_.assertDefined(path[i]);
			}
			//if(syncId > 100) _.errout('false sync id');
			var msgStr = JSON.stringify([id, path, op, edit, syncId]);
			client.send(msgStr);
			if(msgStr.length < 1000) console.log('msg: ' + msgStr);
			else{
				var sm = msgStr;
				sm = msgStr.substr(0, 100) + '...' + msgStr.substr(msgStr.length-100);
				console.log('msg: ' + sm);
			}
		}
					
		client.on('disconnect', function(){
			console.log('disconnected');
			clientHasDisconnected = true;
			if(!waitingForSyncId){
				service.endSync(syncId);
			}
		});

		function readyCb(){
			client.send(JSON.stringify(['ready']));
		}
		
		client.on('message', function(msg){
			//TODO handle case where clientHasDisconnected already
			if(waitingForSyncId){
				msg = JSON.parse(msg);
				syncId = msg[0];
				var snapshotId = msg[1];
				
				console.log('got client sync id: ' + syncId);
				var clientInfo = clientInfoBySyncId[syncId];
				delete clientInfoBySyncId[syncId];
				
				if(clientInfo === undefined){
					client.send(JSON.stringify(['reset']));
					client.disconnect();
				}else{
					viewCode = clientInfo[0];
					params = clientInfo[1];
					snapshotIds = clientInfo[2];
					
			
					service.beginSync(viewCode, params, snapshotId, syncListener, readyCb);
			
					waitingForSyncId = false;
				}
			}else{
				msg = JSON.parse(msg);
				console.log('msg: ' + JSON.stringify(msg))
				_.assertLength(msg, 4);
				service.processEdit(msg[0], msg[1], msg[2], msg[3], syncId);
			}
			console.log('got client msg: ' + JSON.stringify(msg));
		});
		
	});
	
	socketServer.listen(port);
	
	app.serveJavascriptFile(exports, 
		__dirname + '/../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js', 'socket.io');
	*/
	console.log('minnow matterhorn service set up');
	/*
	return {
		getViewTags: function(viewName, params, vars, cb){
			_.assertLength(arguments, 4);
			
			service.getViewFiles(viewName, params, function(snapshotIds, paths, syncId, lastSeenVersionId){
			
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
			});
		}
	};*/
}