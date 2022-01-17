function(e){
            if     (this.move.left) {this.x = this.x - speed;}
            else if(this.move.right){this.x = this.x + speed;}
            else if(this.move.up)   {this.y = this.y - speed;}
            else if(this.move.down) {this.y = this.y + speed;}
            
            
            //Logging
            //get the current time
            currentTime = new Date();
            
            //compare that time (currentTime) with the last recorded time (time)
            //If the difference is more than 5 seconds (5 seconds has elapsed)
            //Then player logs its current position (player 2 sends its position to player 1 to be logged)
            if (currentTime.getTime() - time.getTime() >= 5000){
                time = currentTime;
                if (playerNumber == 1){
                    logTime();
                    log += " player1: position = (" + player.x + "," + player.y + ")";
                }
                else{
                    socket.emit("logPos", player.x, player.y, channelNumber);
                }
            }
        }