function connectSocket(){
    socket =  io.connect(cfg.socket.host);
    //主机开始。准备待机。。

    socket.on('connect',function(){
        console.log('connect ok');
    });

    socket.on('disconnect',function(){
        console.log('oh!no we lost you :(');
    });

    socket.on('initGames',function(param){
        gameParam = param;
        socket.emit('availablePerson');
    });

    //可选择角色。。。
    socket.on('availablePerson',function(param){
        console.log(param);

        if(param.indexOf(-1) == -1){
            UI.disableSelete('boss');
        }

        if(param.indexOf(1) == -1){
            UI.disableSelete(0);
        }

        if(param.indexOf(2) == -1){
            UI.disableSelete(1);
        }

        if(param.indexOf(3) == -1){
            UI.disableSelete(2);
        }
    });



    //发生异常
    socket.on('raiseException',function(data){
        console.log(data);
    });

    //开始游戏,载入游戏场景。
    socket.on('gameStart',function(){


    });

    //获取当前角色的sessionID。
    socket.on('sendCurrentSessionID',function(data){
        console.log('sendCurrentSessionID');
        if(!!data){
            Role.currentSessionID = data;
        }
    });

    //重新载入舞台
    socket.on('reloadStage',function(_data){
        if(_data.hasOwnProperty('collection')){
            if(!!_data.collection.watcher){
                if(Role.currentSessionID && Role.currentSessionID == _data.collection.watcher.session){
                    Role.id = -1;
                    Role.current = 'boss';
                }
                addBoss();
            }

            if(_data.collection.wooder.length>0){
                for(var n=0;n<_data.collection.wooder.length;n++){
                    if(Role.currentSessionID && Role.currentSessionID == _data.collection.wooder[n].sessionID){
                        Role.id = n+1;
                        Role.current = 'wooder';
                    }
                    addWood(n);
                    jumpWood(n,_data.collection.wooder[n].position);
                }
            }
        }

        switchRole();
    });

    //connect the server success.
    socket.on('success',function(data){
        if(data === 'noInit'){
            console.log('can not join the game! sorry');
            return;
        }
        if(data === '-1'){
            console.error('房间人数已满。');
            return;
        }

        if(data.id && data.id == -1){
            addBoss();
            Role.current = 'boss';
            socket.on('afterCooling',function(){
                showDraw123();
            });
        }

        if(data.roleId && data.roleId == 1 || data.roleId == 2 || data.roleId == 3){
            addWood(~~data.roleId - 1);
            Role.current = 'wooder';
            Role.id = ~~data.roleId;
        }

        switchRole();
    });



    //刷新每个人的位置
    socket.on('returnPositionInfo',function(data){
        console.log('reflash data!');
        for(var n= 0 ; n <data.length;n++){
            if(n==Role.id-1){
                console.log(~~data[n]);
            }
            if(!!data[n]){jumpWood(n,~~data[n]);}
        }
    });

    socket.on('twistBody',function(){
        showBoss("side");
    });


    socket.on('alert',function(data){
        alert(data);
    });


//加入一个新的玩家
    socket.on('addPerson',function(data){
        if(data === 'noInit'){
            console.log('error! no game room create!');
            return;
        }

        if(data === '-1'){
            console.log('people are overload');
            return;
        }

        if(data.id && data.id == -1){
//            console.log('add boss?')
            addBoss();
            Role.current = 'boss';
        }

        if(data.roleId && data.roleId == 1 || data.roleId == 2 || data.roleId == 3){
            addWood(~~data.roleId - 1);
            Role.current = 'wooder';
        }
    });


    socket.on('outStage',function(data){
        console.log(data.roleId);
        overWood(~~data.roleId - 1);
    });

    socket.on('confirmTurn',function(data){
        if(data == 1){
            showBoss("face");
        }
    });

    socket.on('win',function(data){
        showScene('win');
        if(data == -1){
            showWin('boss');
        }else{
            showWin(~~data-1);
        }
    });

    socket.on('twistBackBody',function(){
        showBoss("back");
        if(Role.current == 'boss'){
            showDraw123();
        }
    });

}