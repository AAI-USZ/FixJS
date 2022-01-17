function(e, listenerCb, readyCb){
				_.assertFunction(listenerCb);
				_.assertFunction(readyCb);
				
				//console.log('beginning sync')
				
				if(schema._byCode[e.typeCode].isView){
					return viewState.beginSync(e, listenerCb, function(updatePacket){
						//var syncId = syncHandleCounter;
						//++syncHandleCounter;
						console.log('got UPDATE PACKET')
						readyCb(updatePacket);
					});
				}else{
					_.errout('ERROR');
					//broadcaster.output.listenByObject(typeCode, params, listenerCb);
				}
			}