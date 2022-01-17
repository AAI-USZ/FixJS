function(updatePacket){
					_.assertArray(updatePacket)
					w.ready({requestId: e.requestId, updatePacket: JSON.stringify(updatePacket)})
					w.flush();
				}