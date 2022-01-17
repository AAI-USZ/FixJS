function(data){
        console.log("redmine connect : ");

        socket.emit('redmineExtract', function(data) {
             console.log("data : ", data);
        });

        socket.on('log', function(data){
            console.log("data : ", data);
        });
    }