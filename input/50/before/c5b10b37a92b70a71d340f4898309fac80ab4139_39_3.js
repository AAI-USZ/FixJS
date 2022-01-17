function(updatePacket){
						//var syncId = syncHandleCounter;
						//++syncHandleCounter;
						console.log('got UPDATE PACKET')
						readyCb(updatePacket);
					}