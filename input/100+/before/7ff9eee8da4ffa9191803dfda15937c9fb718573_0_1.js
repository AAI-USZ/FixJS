function(data){
		if(!gameParams){
			console.log("init gameParams");
			//init gameParams
			gameParams = {
					config:{stepLength:2,watchTimeLimit:4,gameTimeLimit:60},
					gameStatus:{winner:0,currentTime:0,status:3,lastWalkId:0,lastWalkRoleId:0,turnLock:false},
					role:{
				      	1:{name:'role1',source:'01'},
				      	2:{name:'role2',source:'02'},
				      	3:{name:'role3',source:'03'},
				      	4:{name:'role4',source:'04'}
						},
					collection:{
						watcher:{
							id:0,
							session:0,
							watchTime:0,
							turnWilling:false,
							turning:false
						},
						wooder:[],
					}
			};	
		}

        //			console.log("socket.handshake.sessionId:"+ socket.handshake.sessionID);
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
						if(wooder.length > 0){
							for(var i=0;i< wooder.length;i++){
								console.log(wooder[i].sessionId);
								console.log(sessionID);
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
					socket.emit("reloadStage",gameParams);
					return;
					}
				}

//		socket.emit('initGames',gameParams);
	}