function(data) {
        if(data.pass == masterpass){
            musicqueue.flushQueue();
            io.sockets.emit('re_init');
        }
    }