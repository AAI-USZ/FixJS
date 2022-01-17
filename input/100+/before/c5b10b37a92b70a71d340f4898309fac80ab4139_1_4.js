function make(host, port, readyCb){
	_.assertLength(arguments, 3);
	_.assertString(host)
	_.assertInt(port);
	_.assertFunction(readyCb);
	
	
	var callbacks = {};
	var requestIdCounter = 1;
	function applyRequestId(e, cb){
		_.assertFunction(cb);
		//var reqId = requestIdCounter;
		//++requestIdCounter;
		//e.requestId = reqId;
		makeRequestId(e);
		callbacks[e.requestId] = cb;
	}
	function makeRequestId(e){
		var reqId = requestIdCounter;
		++requestIdCounter;
		e.requestId = reqId;
	}
	function getRequestCallback(e){
		var cb = callbacks[e.requestId];
		//_.assertFunction(cb);
		return cb;
	}
	
	var syncListenerCallbacks = {};
	var syncReadyCallbacks = {};
	
	var serverInstanceUid;
	
	var reader = {
		setup: function(e){
			serverInstanceUid = e.serverInstanceUid;
			_.assertString(serverInstanceUid);
			//console.log('tcp client got setup')
			readyCb(handle, syncId)
		},
		newSyncId: function(e){
			var cb = getRequestCallback(e);
			cb(e.syncId);
		},
		update: function(e){
			//console.log('tcpclient got response update: ' + JSON.stringify(e))
			var cb = syncListenerCallbacks[e.requestId];
			_.assertFunction(cb);
			cb(e);
		},
		ready: function(e){
			//console.log('tcpclient got response ready(' + e.syncId + '): ' + JSON.stringify(e))
			var cb = syncReadyCallbacks[e.requestId];
			_.assertFunction(cb);
			cb(e);
		},
		gotSnapshots: function(e){
			var cb = getRequestCallback(e);
			//console.log('tcpclient got response gotSnapshots: ' + JSON.stringify(e))
			cb(e);
		},
		gotAllSnapshots: function(e){
			var cb = getRequestCallback(e);
			//console.log('tcpclient got response gotAllSnapshots: ' + JSON.stringify(e))
			cb(e);
		},
		gotSnapshot: function(e){
			var cb = getRequestCallback(e);
			cb(e);
		},
		objectMade: function(e){
			var cb = getRequestCallback(e);
			cb(e);
		}
	};
	
	var deser;
	var client = net.connect(port, host, function(){
		//readyCb(handle);
		//console.log('tcp client waiting for setup message');
	});
	
	var exes
	var w
	
	var firstBuf = true
	var schemaBufLength;
	var firstBufs = []
	var needed;
	var syncId
	function mergeBuffers(bufs){
		var total = 0
		bufs.forEach(function(b){
			total += b.length;
		})
		var nb = new Buffer(total)
		var off = 0
		bufs.forEach(function(b){
			b.copy(nb, off)
			off += b.length;
		})
		return nb;
	}
	deser = function(buf){//this handles the initial setup
		if(firstBuf){
			needed = schemaBufLength = bin.readInt(buf, 0)
			buf = buf.slice(8)
			firstBuf = false;
		}
		if(needed <= buf.length){
			firstBufs.push(buf.slice(0, needed))
			var schemaStr = mergeBuffers(firstBufs).toString('utf8')
			var all = JSON.parse(schemaStr)
			syncId = all.syncId
			setupBasedOnSchema(all.schema)
			if(buf.length > needed){
				deser(buf.slice(needed))
			}
		}else{
			firstBufs.push(buf)
		}
	}
	
	function setupBasedOnSchema(schema){
		handle.schema = schema
		exes = shared.makeExes(schema);
		deser = exes.responses.binary.stream.makeReader(reader);
		w = exes.client.binary.stream.makeWriter(4*1024, {
			write: function(buf){
				client.write(buf);
			},
			end: function(){
			}
		});
	}
	
	client.on('data', function(data) {
		deser(data);
	});
	client.on('end', function() {
		console.log('client disconnected');
	});
	
	
	var handle = {
		serverInstanceUid: function(){
			return serverInstanceUid;
		},
		makeSyncId: function(cb){
			_.assertFunction(cb);
			var e = {};
			applyRequestId(e, cb);
			w.makeSyncId(e);
			w.flush();
		},
		beginSync: function(e, listenerCb, cb){
			_.assertFunction(cb)
			_.assertFunction(listenerCb)

			makeRequestId(e);
			syncListenerCallbacks[e.requestId] = listenerCb;
			syncReadyCallbacks[e.requestId] = cb;

			w.beginSync(e);
			w.flush()
		},
		endSync: function(e){
			w.endSync(e);
			w.flush()
		},
		persistEdit: function(e, cb){
			console.log('got edit: ' + JSON.stringify(e).slice(0, 300))
			applyRequestId(e, cb);
			try{
				w.persistEdit(e);
				w.flush()
			}catch(e){
				console.log('invalid edit received and not sent to server: ' + JSON.stringify(e));
				delete callbacks[e.requestId];
			}
		},
		getSnapshots: function(e, cb){
			_.assertFunction(cb)
			applyRequestId(e, cb);
			w.getSnapshots(e);
			w.flush()
		},
		getAllSnapshots: function(e, cb){
			_.assertFunction(cb)
			applyRequestId(e, cb);
			w.getAllSnapshots(e);
			w.flush()
		},
		getSnapshot: function(e, cb){
			_.assertFunction(cb)
			applyRequestId(e, cb);
			w.getSnapshot(e);
			w.flush()
		},
		close: function(cb){
			w.flush()
			client.on('end', function(){
				console.log('tcp client closed')
				cb()
			})
			client.end()
			//cb()
		}
	}

}