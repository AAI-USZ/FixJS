function(data){
		console.log("walk object:",gameParams);

        if('object' !== typeof(data)){return;}
        if(!data.hasOwnProperty('roleId')){return;}

		//��ȡroleId
		var roleId = data.roleId;
		var stepLength = gameParams.config.stepLength;
		var rolePositionContainer = [];
        console.log(roleId);
		if(gameParams.collection.wooder[roleId-1] && !gameParams.collection.wooder[roleId-1].active){
			return ;
		}

		gameParams.gameStatus.lastWalkId += 1;
		gameParams.gameStatus.lastWalkRoleId = roleId;
		if(gameParams.gameStatus.turnLock){
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
			rolePositionContainer[i] = wooderList[i] ? wooderList[i].position : null;
		}
		socket.emit('returnPositionInfo',rolePositionContainer);
		socket.broadcast.emit('returnPositionInfo',rolePositionContainer);
		console.log("position info:"+rolePositionContainer);
		return ;
	}