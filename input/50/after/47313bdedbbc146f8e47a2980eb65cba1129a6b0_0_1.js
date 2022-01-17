function(data) {
        if(data.pass == masterpass){
            musicqueue.flushQueue();
            clearTimeout(dospotify.timeoutId);
            io.sockets.emit('re_init');
        }
    }