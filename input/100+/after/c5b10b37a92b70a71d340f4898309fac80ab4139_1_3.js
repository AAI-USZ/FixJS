function makeSyncHandle(syncId){
	
		var handle = {
			beginView: function(e, cb){
				_.assertLength(arguments, 2)
				_.assertFunction(cb)

				_.assertArray(JSON.parse(e.params))

				makeRequestId(e);
				syncReadyCallbacks[e.requestId] = cb;
				console.log('tcpclient e.params: ' + JSON.stringify(e.params))

				w.beginView(e);
				//w.flush()
			},
			endView: function(e){
				w.endView(e);
				//w.flush()
			},
			persistEdit: function(op, edit, sourceSyncId, cb){
				_.assertLength(arguments, 4)
				_.assertString(op)
				_.assertInt(sourceSyncId)
				//console.log('got edit: ' + JSON.stringify(e).slice(0, 300))
				//_.assertInt(e.typeCode)
				//e.edit = {type: e.op, object: e.edit}
				var e = {op: op}
				var nw = fparse.makeSingleBufferWriter()
				console.log('op: ' + op)
				fp.writers[op](nw, edit)
				e.edit = nw.finish()
				e.syncId = sourceSyncId
				//_.errout('binarize edit')
				//e.destinationSyncId = syncId
				applyRequestId(e, cb);
				try{
					w.persistEdit(e);
					//w.flush()
				}catch(e){
					console.log(e)
					console.log('invalid edit received and not sent to server: ' + JSON.stringify(e));
					delete callbacks[e.requestId];
				}
			}
		}
		return handle;
	}