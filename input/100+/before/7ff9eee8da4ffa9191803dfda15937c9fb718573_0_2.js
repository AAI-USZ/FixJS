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
	}