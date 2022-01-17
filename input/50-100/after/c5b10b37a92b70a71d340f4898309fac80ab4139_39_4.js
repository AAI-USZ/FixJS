function(e, readyCb){
				//_.assertFunction(listenerCb);
				_.assertLength(arguments, 2)
				_.assertFunction(readyCb);
				
				var listenerCb = listenerCbs[e.syncId]
				_.assertFunction(listenerCb)
				console.log('beginView: ' + JSON.stringify(e))
				return viewState.beginView(e, listenerCb.seq, listenerCb, function(updatePacket){
						readyCb(updatePacket);
				})
			}