function(serverHandle, syncId){
		_.assertInt(syncId)
		
		var dbSchema = serverHandle.schema;
	
		if(console.log !== ooo) ooo('*got inmem')
		
		var cc = serverHandle//clientConnection.make(serverHandle);
		
		var serviceIsSetup = false;
		var xhrServiceIsSetup = false
		
		var uid = Math.random()
		
		var viewGetter = _.memoizeAsync(function(type, params, st, syncId, cb){
			console.log(uid + ' getting view ' + type + JSON.stringify(params))
			getView(dbSchema, cc, st, type, params, syncId, cb)
		},function(type, params){
			var key = type + JSON.stringify(params)
			console.log(uid + ' view key (' + key + ')')
			return key
		})
		var handle = {
			//begins the creation process for an externally-accessible object of the given type
			schema: dbSchema,
			//schemaName: dbName,
			internalClient: cc,
			makeSyncId: function(cb){
				cc.makeSyncId(cb)
			},
			serverInstanceUid: cc.serverInstanceUid,
			setupService: function(local, port){
				_.assertNot(serviceIsSetup);
				serviceIsSetup = true;
				console.log('minnow-matterhorn service is running')
				return matterhornService.make(local, port, handle);
			},
			setupXhrService: function(name, local, authenticator){
				_.assertNot(xhrServiceIsSetup);
				xhrServiceIsSetup = true;
				console.log('minnow-xhr service is running')
				return xhrService.make(name, dbSchema, local, handle, authenticator);
			},
			view: function(type, params, cb){
				var st = dbSchema[type];
				if(st === undefined){_.errout('unknown view: ' + type);}
	
	
	
				_.assertNot(st.superTypes.abstract);
				if(arguments.length === 2 && st.isView && st.viewSchema.params.length === 0){
					cb = params;
					params = [];

				}else{
					_.assertLength(arguments, 3)
				}
				viewGetter(type, params, st, syncId, cb)
			},
			getDefaultSyncId: function(){
				return syncId
			},
			close: function(cb){
				serverHandle.close(cb);
			}
		};
		if(console.log !== ooo) ooo('#calling back')
		clientCb(handle);
	}