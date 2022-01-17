function(evt) {
        var now = +new Date;
        if(now-lastMove > 100) {
            console.log(now-lastMove);
            console.log(evt);
            lastMove = now;
            connection.sendMessage({
                position: {x: evt.clientX, y: evt.clientY}
            });
        }
    }