function(data){
        console.log(data);

        server.sockets.emit("sendEvent", data);
    }