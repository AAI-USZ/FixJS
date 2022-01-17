function(data){
		
		
		//check wheather game init?
		console.info("recieve add Person Request and Deal With It");
		if(!gameParams.collection){
			socket.emit('addPerson',"NoInit");
			return;
		}
		var wooderCollection = gameParams.collection.wooder;		
		if(wooderCollection.length > 2){
			socket.emit('addPerson',"-1");
			return;
		}
		console.log("data.roleId is:"+data.roleId);
		if(data.roleId) {
			console.log("socket.handshake.sessionId:"+ socket.handshake.sessionID);
			if(socket.handshake.sessionID){
				var sessionID = socket.handshake.sessionID;
				console.log(sessionID);
				var role_in_list = function(sessionID,gameParams){
					console.log(gameParams.collection.watcher.session+"==?"+sessionID);
					if(gameParams.collection.watcher.session && gameParams.collection.watcher.session == sessionID){
						console.log("Am'I Here?");
						return true;
					}else{
						var collection = gameParams.collection;
						var wooder = collection.wooder;
						console.log("==============");
						console.log(collection);
						console.log(wooder);
						console.log("==============");
						if(wooder.length > 0){
							for(var i=0;i< wooder.length;i++){
								console.log("############");
								console.log(wooder[i].sessionID+"==?"+sessionID);
								console.log(wooder[i]);
								console.log("############");
								if (wooder[i].sessionID == sessionID){
									return true;
									}
								}
						}		
					}
				return false;
				}
				if(role_in_list(sessionID,gameParams)){
					socket.emit("raiseException",-2);
					socket.emit("sendCurrentSessionID",sessionID);
					socket.emit("reloadStage",JSON.stringify(gameParams));
					return;
					}
				}
			var rolePool = [];  //rolePool
			if(data.roleId == -1){
				gameParams.collection.watcher.id = -1; //id -1Ϊboss�ı�ʶ
				gameParams.collection.watcher.session = socket.handshake.sessionID;
				var newRoleWatcher = gameParams.collection.watcher;
				socket.broadcast.emit('addPerson',newRoleWatcher);
				
				socket.emit('success',newRoleWatcher);
				console.info("add watcher success, watch property:",newRoleWatcher);
			}else{
				gameParams.gameStatus.status = 1;
				var currentIndex = wooderCollection.length +1;
				var newRoleWood = {roleId : data.roleId, sessionID: socket.handshake.sessionID, position:0, lastPosition:0, active:true};
				gameParams.collection.wooder.push(newRoleWood);
				console.info("now wooder ", gameParams.collection.wooder);
				socket.broadcast.emit('addPerson',newRoleWood);
				socket.emit('success',newRoleWood);
			}
				return;
			
		}
	}