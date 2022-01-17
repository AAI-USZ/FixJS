function advanceSentBuffer(){
					while(true){
						if(sentBuffer.length === 0) return
						var e = sentBuffer[0]
						if(e.got === true){
							e.edits.forEach(function(e){
								//listenerCb(e)
								_.assertBuffer(e.edits)
								//console.log('e: ' + JSON.stringify(e).slice(0,300))
								//console.log('sending object: ' + JSON.stringify(e).slice(0,300))
								objectCb(e)
							})
							if(e.edits.length === 0){
								console.log('0 objects actually sent')
							}
							sentBuffer.shift()
							//advanceSentBuffer()
						}else if(e.got === false){
							return;
						}else{
							_.assert(e.id === -1 || alreadySent[e.id])
							console.log('sending edit: ' + JSON.stringify(e))
							listenerCb(e)
							sentBuffer.shift()
						}
					}
				}