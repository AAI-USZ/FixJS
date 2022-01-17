function(data) {
        if(valid_admin(data.pass)){
            clearTimeout(dospotify.timeoutId);
            dospotify.emit('play_done');
        }
    }