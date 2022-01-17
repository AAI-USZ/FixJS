function(c){
	
		var ws = fs.createWriteStream('tcp server->client.' + (++logCounter) + '.log')
	
		console.log('tcp server got connection')
		console.log(new Error().stack)
		
		connections.push(c)

		var updaters = {}

		var wrappedListenerCb;
		var listenerCb = function(){
			wrappedListenerCb.apply(undefined, Array.prototype.slice.apply(arguments))
		}
		var wrappedObjCb;
		var objCb = function(){
			wrappedObjCb.apply(undefined, Array.prototype.slice.apply(arguments))
		}
		var syncId = s.beginSync(listenerCb, objCb)
		
		
		
		var currentId;
		//var currentTypeCode;
		
		var currentResponseId
		//var currentResponsePath = []
		
		wrappedListenerCb = sendEditUpdate.bind({}, {syncId: syncId})
		wrappedObjCb = sendObject.bind(undefined, {syncId: syncId})
		
		var setupStr = JSON.stringify({syncId: syncId, schema: appSchema})
		var setupByteLength = Buffer.byteLength(setupStr, 'utf8')
		var setupBuffer = new Buffer(setupByteLength+8)
		bin.writeInt(setupBuffer, 0, setupByteLength)
		setupBuffer.write(setupStr, 8)
		
		c.write(setupBuffer)

		var w = exes.responses.binary.stream.makeWriter({
			write: function(buf){
				c.write(buf);
			},
			end: function(){
				//TODO?
			}
		});
		
		var flushHandle = setInterval(function(){
			w.flush()
		},10)

		
		var viewHandles = []
		
		var pathUpdaters = {}
		
		var alreadySentEdit = {}
		
		var pathsFromClientById = {}
		
		function sendObject(e, ob){
			_.assertBuffer(ob.edits)
			ws.write('sending object: ' + ob.id+'\n')
			ob.destinationSyncId = e.syncId
			w.updateObject(ob);
		}
		function binEdit(op, edit){
			var nw = fparse.makeSingleBufferWriter()
			//console.log('getting writer: ' + e.type)
			fp.writers[op](nw, edit)
			return nw.finish()
		}
		function sendEditUpdate(e, up){
			_.assertLength(arguments, 2)
			_.assertInt(up.typeCode)
			
			ws.write('sending update: ' + JSON.stringify(up)+'\n')
			//console.log(new Error().stack)
			//if(_.isInt(up.id)) _.assert(up.id >= 0)
			if(w === undefined){
				throw new Error('got update after already disconnected')
			}

			var editKey = up.id+'|'+up.editId+up.op+JSON.stringify(up.path)

			if(alreadySentEdit[editKey]){
				ws.write('already sent edit: ' + editKey + '\n')
				return
			}
			
			alreadySentEdit[editKey] = true
			
			if(this.currentSyncId !== up.syncId){
				this.currentSyncId = up.syncId
				sendUpdate('setSyncId', {syncId: up.syncId}, -1, up.editId, e.syncId)					
			}
			_.assertArray(up.path)


			if(up.id !== -1){
				if(currentResponseId !== up.id){
					if(_.isString(up.id)){
						sendUpdate('selectTopViewObject', {id: up.id}, -1, up.editId, e.syncId)					
					}else{
						sendUpdate('selectTopObject', {id: up.id}, -1, up.editId, e.syncId)					
					}
				}
				currentResponseId = up.id
				
				_.assertDefined(up.id)
				
				var pathUpdater = pathUpdaters[up.id]
				if(pathUpdater === undefined) pathUpdater = pathUpdaters[up.id] = shared.makePathStateUpdater(appSchema, up.typeCode)
			
				console.log('updating to path ' + JSON.stringify(up.path))
				pathUpdater(up.path, function(op, edit){
					console.log('sending update: ' + JSON.stringify([op, edit]))
					sendUpdate(op, edit, -1, up.editId, e.syncId)					
				}, up)
				console.log('...done updating to path ' + JSON.stringify(up.path))
				console.log('sending actual: ' + JSON.stringify([up.op, up.edit]))
			}
			
			
			sendUpdate(up.op, up.edit, up.syncId, up.editId, e.syncId)
			
		}
		function sendUpdate(op, edit, syncId, editId, destinationSyncId){
			_.assertLength(arguments, 5)
			ws.write('writing edit: ' + op + ' ' + JSON.stringify(edit) + ' ' + syncId + ' ' + editId + ' ' + destinationSyncId+'\n')
			var binaryEdit = binEdit(op, edit)
			if(syncId === undefined) syncId = -1
			_.assertInt(editId)
			var update = {
				op: op,
				edit: binaryEdit,
				syncId: syncId, 
				editId: editId,
				destinationSyncId: destinationSyncId};

			w.update(update);
		}
		function sendReady(e, updatePacket){
			_.assertArray(updatePacket)
			//console.log('sending ready')
			w.ready({requestId: e.requestId, updatePacket: JSON.stringify(updatePacket)})
			w.flush();
		}
		
		var reader = {
			beginSync: function(e){
				var updater = sendEditUpdate.bind({}, e)
				var objectUpdater = sendObject.bind(undefined, e)
				var syncId = s.beginSync(updater, objectUpdater);
				e.syncId = syncId
				updaters[syncId] = updater
				//console.log('writing new sync id: ' + syncId + ' }}}				w.newSyncId({requestId: e.requestId, syncId: syncId});
				w.flush();
			},
			beginView: function(e){
				//e.params = JSON.parse(e.params)
				//console.log('e.params: ' + JSON.stringify(e.params))
				var viewHandle = s.beginView(e, sendReady.bind(undefined, e));
				_.assertObject(viewHandle)
				viewHandles.push(viewHandle)
			},
			endView: function(e){
			},
			endSync: function(e){
				console.log('tcpserver got client request endSync: ' + JSON.stringify(e))
				//TODO
			},
			persistEdit: function(e){
				var r = fparse.makeSingleReader(e.edit)				
				e.edit = fp.readers[e.op](r)
				
				var syncId = e.syncId
				
				var op = e.op
				ws.write('(' + currentId + ') tcpserver got client(' + syncId + ') request persistEdit: ' + JSON.stringify(e).slice(0,300)+'\n')
				console.log('(' + currentId + ') tcpserver got client(' + syncId + ') request persistEdit: ' + JSON.stringify(e).slice(0,300)+'\n')
				if(op === 'selectTopObject'){
					currentId = e.edit.id
					_.assertInt(currentId)
					return
				}else if(op === 'selectTopViewObject'){
					currentId = e.edit.id
					_.assertInt(currentId)
					return
				}
				
				console.log('current id (tcpserver-client): ' + currentId)

				var pu = pathsFromClientById[currentId]
				if(pu === undefined) pu = pathsFromClientById[currentId] = pathupdater.make([])
				var wasPathUpdate = pu.update(e)
				
				if(wasPathUpdate){
					console.log('processed path update: ' + JSON.stringify(e))
					console.log('path now: ' + JSON.stringify(pu.getPath()))
					return
				}
				
				if(e.op === 'make') currentId = -1
				_.assertInt(currentId)

				var tg = getTemporaryGenerator(syncId, ws)//temporaryGeneratorsBySyncId[syncId]
				_.assertFunction(tg)
				s.persistEdit(currentId, e.op, pu.getPath(), e.edit, syncId, tg, function(result){
					if(op === 'make'){
						//if(pathsFromClientById[result.temporary]){
						pathsFromClientById[result.temporary] = pathsFromClientById[result.id] = pathupdater.make([])
						//}
						currentId = result.id//this works because make can be executed synchronously
						
						_.assertInt(result.id);
						w.objectMade({requestId: e.requestId, id: result.id, temporary: result.temporary});
						console.log('wrote objectMade')
						//w.flush();
					}
				});
			},
			getSnapshots: function(e, cb){
				s.getSnapshots(e, function(versionList){

					
					var res = {snapshotVersionIds: serializeSnapshotVersionList(versionList)}
					res.requestId = e.requestId;
					w.gotSnapshots(res);
					w.flush();
				});
			},//makeRequestWrapper('getSnapshots', 'gotSnapshots'),
			getAllSnapshots: function(e, cb){
				e.snapshotVersionIds = deserializeSnapshotVersionIds(e.snapshotVersionIds)
				s.getAllSnapshots(e, function(res){
					res.requestId = e.requestId;
					res.snapshots = serializeAllSnapshots(res.snapshots)
					w.gotAllSnapshots(res);
					w.flush();
				});
			},
			getSnapshot: function(e, cb){
				s.getSnapshot(e, function(res){
					//res.snap = serializeSnapshot(res.snap)
					w.gotSnapshot({snap: res, requestId: e.requestId});
					w.flush();
				});
			}
		}

		c.on('end', function() {
			console.log('client disconnected')
			ws.end()
			viewHandles.forEach(function(sh){
				sh.end()
			})
			clearInterval(flushHandle)
			//w.flush()
			w.end(undefined, true)
			w = undefined
			connections.splice(connections.indexOf(c), 1)
		});

		var deser;
		c.on('connect', function(){
			deser = exes.client.binary.stream.makeReader(reader);
		})
		c.on('data', function(buf){
			deser(buf);
		})
		
		//console.log('writing setup')
		w.setup({serverInstanceUid: s.serverInstanceUid(), schema: JSON.stringify(appSchema)});
		w.flush()
		//console.log('flushed setup')
	});
