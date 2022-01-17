function(e){
            if(this.move.left == false && this.move.right == false && this.move.up == false && this.move.down == false){
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
            else if(this.move.left){
                if(e.key == Crafty.keys.LEFT_ARROW){
                    this.move.left = true;
                }
            }
            else if (this.move.right == true){
                if(e.key == Crafty.keys.RIGHT_ARROW){
                    this.move.right = true;
                }
            }
            else if (this.move.up == true){
                if(e.key == Crafty.keys.UP_ARROW){
                    this.move.up = true;
                }
            }
            else if (this.move.down == true){
                if(e.key == Crafty.keys.DOWN_ARROW){
                    this.move.down = true;
                }
            }
              
        }