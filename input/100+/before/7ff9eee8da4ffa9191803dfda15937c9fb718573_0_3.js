function(socket){
	console.info("SessionID:"+ socket.handshake.sessionID );
	console.info("client have connect to server");
	socket.on('ready',function(data){
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
	});


	//get availablePerson
	socket.on('availablePerson',function(data){
		console.info('check is any available person?');
		//return boss and woodman status


//		if(!!gameParams.collection.watcher && gameParams.collection.watcher.id == 0){ // if watcher.id==0 that means we can choose this role
//			statusList.push(-1);
//		}
//		var wooders = gameParams.collection.wooder;
//		console.log(wooders);
//		var allwooders = [1,2,3];
//
//		if (wooders.length > 0){
//			var woodersList = [];
//			for (var i=0;i<wooders.length;i++){
//				woodersList.push(wooders[i].roleId);
//			}
//			for (var j=0;j<allwooders.length;j++) {
//				if (woodersList.indexOf(allwooders[j].toString()) == -1){
//					statusList.push(allwooders[j]);
//				}
//			}
//		}else{
//			statusList = statusList.concat(allwooders);
//		}

		socket.emit("availablePerson",statusList);
		return;
	});
	
	//add person
	socket.on('addPerson',function(data){
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
		console.log(data);
		console.log("data.roleId is:"+data.roleId);
		if(data.hasOwnProperty('roleId') && [-1,1,2,3].indexOf(~~data.roleId) !== -1) {
            //角色已经被选择。

            console.log(statusList);
            if(statusList.indexOf(~~data.roleId) === -1){socket.emit('alert','角色已经被人抢选了，请选择其他角色。');return;}

			var rolePool = [];  //rolePool
			if(data.roleId == -1){
				gameParams.collection.watcher.id = -1; //id -1 BOSS
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

            statusList = rmArrEle(statusList,data.roleId);
            socket.broadcast.emit("availablePerson",statusList);
            return;
		}else{
            console.log('参数异常');
            return;
        }
	});
	
	//������·�¼�
	socket.on("walk",function(data){
		console.log("walk object:",gameParams);
		//��ȡroleId
		var roleId = data.roleId;
		var stepLength = gameParams.config.stepLength;
		var rolePositionContainer = [];
		if(!gameParams.collection.wooder[roleId-1].active){
			return ;
		}
		//��ȡ���walk���¼�
		gameParams.gameStatus.lastWalkId += 1;
		gameParams.gameStatus.lastWalkRoleId = roleId;
		if(gameParams.gameStatus.turnLock){ //���תͷ���¼�Ϊtrueʱ����walk���������������
			gameParams.collection.wooder[roleId-1].active = false;
			socket.emit("outStage",{roleId:roleId});
			socket.broadcast.emit("outStage",{roleId:roleId});
			return ;
		}
		
		gameParams.collection.wooder[roleId-1].position += stepLength;
		if(gameParams.collection.wooder[roleId-1].position >= 100){
			gameParams.gameStatus.winner = roleId;
			gameParams.gameStatus.status = 2;
			socket.broadcast.emit('win',roleId);
			socket.emit('win',roleId);
			return;
		}
		console.log("calculate position: ",	gameParams.collection.wooder[roleId-1].position );
		var wooderList  =  gameParams.collection.wooder;
		for(var i=0;i<wooderList.length;i++){
			rolePositionContainer[i] = gameParams.collection.wooder[i].position;
		}
		socket.emit('returnPositionInfo',rolePositionContainer);
		socket.broadcast.emit('returnPositionInfo',rolePositionContainer);
		console.log("position info:"+rolePositionContainer);
		return ;
	})

	//׼��ת���¼�
	socket.on('willingBegin',function(data){
		if(data == 1){
			gameParams.collection.watcher.turnWilling = true;
			gameParams.collection.watcher,turnWillingTimeStamp = new Date().getTime();
			socket.emit("twistBody",1);
			socket.broadcast.emit("twistBody",1);
			return;
		}
	});
	
	socket.on("confirmTurn",function(data){
		if(data == 1){
			gameParams.gameStatus.turnLock = true;
			for(var i= 0; i< gameParams.collection.wooder.length; i++){
				if(gameParams.collection.wooder[i].active){
					gameParams.collection.wooder[i].lastPosition = gameParams.collection.wooder[i].position;
				}
				
			}
			socket.emit("confirmTurn","1");
			socket.broadcast.emit("confirmTurn","1");
			
			setTimeout(function(){
				gameParams.gameStatus.turnLock = false;
				socket.broadcast.emit("twistBackBody","1");
				socket.emit("twistBackBody","1");
			},500);
			
		}
	});
	
	//console.info(gameParams);
	socket.on('disconnect',function(){

	});
	

}