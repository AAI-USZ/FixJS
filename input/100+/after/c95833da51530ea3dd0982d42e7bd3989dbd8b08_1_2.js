function(n){
            if(n == 1){
                socket.emit('willingBegin',1);
            }else if(n == 3){
                socket.emit('confirmTurn',1);
            }
        }