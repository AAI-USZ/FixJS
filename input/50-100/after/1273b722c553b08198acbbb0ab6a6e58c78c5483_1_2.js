function(xpos, ypos){
            //place the block at the received location
            placeBox(xpos, ypos);
            
            //make sure their are 3 or less blocks currently placed
            //remove the block that was placed the longest ago
            if (blocksPlaced.length > 3){
                blocksPlaced[0].destroy();
                blocksPlaced = blocksPlaced.slice(1);
            }
            
            //log that a block was placed
            logTime();
            log += " block placed at (" + xpos + "," + ypos + ")"
        }