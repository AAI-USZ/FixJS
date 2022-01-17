function(data) {
        if(valid_admin(data.pass)){
            clearTimeout(dospotify.timeoutId);
            musicqueue.playNext();
        }
    }