function(evt) {
        var now = +new Date;
        if(now-lastMove > 100) {
            lastMove = now;
            connection.sendMessage({
                position: {x: evt.clientX, y: evt.clientY}
            });
        }
    }