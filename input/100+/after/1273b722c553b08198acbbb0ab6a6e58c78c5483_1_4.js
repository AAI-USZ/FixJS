function(e){
            if     (this.move.left) {direction = "left";}
            else if(this.move.right){direction = "right";}
            else if(this.move.up)   {direction = "up";}
            else if(this.move.down) {direction = "down";}
            
            
            socket.emit("teleport", e[0].obj.x, e[0].obj.y, direction, channelNumber);
            this.destroy();
        }