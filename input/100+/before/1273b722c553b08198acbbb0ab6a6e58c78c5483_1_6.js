function(e){
            if(e.key == Crafty.keys.LEFT_ARROW){
                this.move.left = true;
            }
            else if(e.key == Crafty.keys.RIGHT_ARROW){
                this.move.right = true;
            }
            else if(e.key == Crafty.keys.UP_ARROW){
                this.move.up = true;
            }
            else if(e.key == Crafty.keys.DOWN_ARROW){
                this.move.down = true;
            }
              
        }