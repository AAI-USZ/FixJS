function(appName, schema, local, minnowClient, authenticator, clientInfoBySyncId){
	_.assertLength(arguments, 6)
	_.assertString(appName)
	_.assertFunction(authenticator)
	
	var service = require('./service').make(minnowClient.schema, minnowClient.internalClient);
	
	var snapPath = '/mnw/snaps/' + appName + '/';
	
	//console.log('minnow socket listening on: ' + port);
	/*
	app.serveJavascriptFile(
		exports, 
		__dirname + '/../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js')*/
	
	var schemaUrl;
	app.serveJavascript(exports, appName, function(ccc){
		_.assertFunction(ccc);
		schemaUrl = ccc('gotSchema(' + JSON.stringify(minnowClient.schema) + ');');
	});
	
	//var bb = {};
	
	app.get(exports, snapPath + ':serverUid/:viewId/:snapshotId/:previousId/:params', function(req, res){

		var snapshotId = parseInt(req.params.snapshotId);
	
		//we shouldn't 304 on the terminal snapshot since it may get bigger (and we'd rather send the data that way 
		//than through socket.io.)
		if(snapshotId === -1 || !matterhorn.do304IfSafe(req, res)){
	
			var viewId = parseInt(req.params.viewId);
			var previousId = parseInt(req.params.previousId);
			var paramStr = req.params.params;

			var key = viewId+':'+paramStr+':'+snapshotId+':'+previousId;
			//TODO cache zipped snapshots
		
			/*if(bb[key]){
				sendData(res, bb[key]);
				return;
			}*/
		
			service.getViewFile(viewId, snapshotId, previousId, paramStr, function(jsStr){

				/*if(bb[key]){
					sendData(res, bb[key]);
					return;
				}*/
			
				zlib.gzip(jsStr, function(err, data){
					if(err) _.errout(err);
				
					//bb[key] = data;
				
					sendData(res, data);
				});
			});
		}
	});
	
	//var clientInfoBySyncId = longpoll.load(exports, appName, schema, authenticator, minnowClient)
	
	//longpoll.make(
	
	/*
	
	var clientInfoBySyncId = {};
	
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
			console.log('sending socket.io message for sync ' + syncId + ', editId: ' + editId);
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
	
	*/
	
	app.serveJavascriptFile(exports, 
		__dirname + '/../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js');
	
	console.log('minnow matterhorn service set up');
	
	return {
		getViewTags: function(viewName, params, vars, cb){
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
	};
}