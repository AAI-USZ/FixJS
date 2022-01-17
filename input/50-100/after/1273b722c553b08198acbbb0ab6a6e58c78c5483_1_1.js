function() {
            
            //emit ready when socket io is running
            socket.emit("ready", "ready");
            
            //wait for setup info from server
            socket.on("setup", function(playerColor, number, channel){
                
                color          = playerColor;
                playerNumber   = number;
                channelNumber  = channel;
                
                //wait for start signal to run main game
                socket.on('start', function(){
                    
                    //log that game has started
                    time = new Date();
                    logTime();
                    log += " level " + level + " started";
                    
                    Crafty.scene("main");
                });
            });
                    
            //displays a waiting for other player message
            message.text("WAITING FOR ANOTHER PLAYER");   
        }