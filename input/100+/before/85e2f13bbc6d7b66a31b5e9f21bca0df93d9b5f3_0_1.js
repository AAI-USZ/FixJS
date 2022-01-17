function(z){
    var packageContext = this;

    var socketUrl;// = 'ws://127.0.0.1:8989/~azrael/iGuess/server/server.php';
    socketUrl = 'ws://10.66.45.34:8088/';
    socketUrl = 'ws://' + location.hostname + ':8088/';
    var socket;
   
    this.init = function(){
        
    }

    this.connect = function(){
        if(!socket){
            // socket = new WebSocket(socketUrl);
            socket = io.connect(socketUrl);
        }
        // socket.addEventListener('open', onSocketOpen);
        // socket.addEventListener('message', onSocketMessage);
        // socket.addEventListener('close', onSocketClose);

        socket.on('connect', onSocketOpen);
        socket.on('message', onSocketMessage);
        socket.on('disconnect', onSocketClose);
    }

    this.send = function(data){
        // socket.send(JSON.stringify(data));
        socket.emit('message', JSON.stringify(data));
    }

    this.on = function(type, func){
        if(type && func){
            z.message.on(packageContext, type, func);
        }else{
            throw type + "'s function is undefined.";
        }
    }

    var onSocketOpen = function(data){
        //console.log('connected');//TODO
        z.message.notify(packageContext, 'connect', data);
    }

    var onSocketMessage = function(data){
        //console.log(data);
        if(data.type){
            z.message.notify(packageContext, data.type, data);
        }
    }

    var onSocketClose = function(data){
        //console.log('disconnected');//TODO
        z.message.notify(packageContext, 'disconnect', data);
    }

}