function() {
        Crafty.background("blue");
        makeBorders();
        setupPlayer();
        placeGoal(level);
        
        
        //drops a block at given position
        //NOTE: server will only ever send this to player 1
        socket.on('dropBlock', function(xpos, ypos){
            //place the block at the received location
            placeBox(xpos, ypos);
            
            //make sure their are 3 or less blocks currently placed
            //remove the block that was placed the longest ago
            if (blocksPlaced.length > 3){
                blocksPlaced[0].destroy();
                blocksPlaced = blocksPlaced.slice(1);
            }
            
            //log that a block was placed
            currentTime = new Date();
            logTime(currentTime);
            log += " block placed at (" + xpos + "," + ypos + ")"
        });
        
        //logs the position of player 2
        //NOTE: server will only ever send this to player 1
        socket.on("logPosition", function(pos){
            currentTime = new Date();
            logTime(currentTime);
            log += " player2: position = (" + pos[0] + "," + pos[1] + ")";
        });
        
        //triggers when the ball is teleported to your side of the screen
        socket.on("teleported", function(pos){
            box = drawPushBox(pos[0],pos[1]);
            direction = pos[2];
            if (direction == "left"){box.move.left = true;}
            else if(direction == "right"){box.move.right = true;}
            else if(direction == "up"){box.move.up = true;}
            else{box.move.down = true;}    
            
        });
        
        //tells the player that the other player left the game
        socket.on("playerLeft", function(message){
            alert(message); 
        });
        
        //sends message in input box to server when you hit enter
        //resets the input box
        $('#msg').keypress(function(key){
            if(key.which == 13){
                var message = [$('#msg').val(), channelNumber];
                $('#msg').val('');
                socket.emit('sendMessage', message);
            }
        });
        
        //print out any messages received from other player
        socket.on('newMessage', function(message){
            $("#data_received").append("<br /> \r\n" + message);
            
            //log the message that was received
            currentTime = new Date();
            logTime(currentTime);
            log += " " + message;
            
            //scroll down to the last thing in box of receieved messages
            var objDiv = document.getElementById("data_received");
            objDiv.scrollTop = objDiv.scrollHeight;
        });
                
    }