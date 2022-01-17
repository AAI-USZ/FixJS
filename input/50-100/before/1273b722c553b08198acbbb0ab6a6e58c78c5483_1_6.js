function(){
        //logs that you won
        currentTime = new Date();
        logTime(currentTime);
        log += " Winner";
        
        //Writes player 1's log to the server
        if(playerNumber == 1){
            socket.emit("log", log);
        }
        
        //Displays the end message to the player
        Crafty.background('#000');
        message = Crafty.e("2D, DOM, Text").attr({w: 400, h: 20, x: 200, y: 390})
                                           .text("!!!!   YOU WIN   !!!!")
                                           .css({"text-align": "center"});
    }