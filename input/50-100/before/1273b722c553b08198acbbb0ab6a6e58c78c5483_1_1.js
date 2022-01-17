function(playerColor, number, channel){
                color          = playerColor;
                playerNumber   = number;
                channelNumber  = channel;
            
                //wait for ready signal to run main game
                socket.on('ready', function(ready){
                    
                    //log that game has started
                    time = new Date();
                    logTime(time);
                    log += " level " + level + " started";
                    
                    Crafty.scene("main");
                });
            }