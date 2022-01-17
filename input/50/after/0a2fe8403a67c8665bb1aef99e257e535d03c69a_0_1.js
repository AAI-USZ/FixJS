function(data) {
        if(valid_admin(data.pass)){
            musicqueue.queue.splice(data.track_number,1);
            io.sockets.emit('re_init');
        }
    }