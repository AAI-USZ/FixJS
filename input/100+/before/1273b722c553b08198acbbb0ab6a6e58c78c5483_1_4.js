function(e){
            if     (this.move.left) {direction = "left";}
            else if(this.move.right){direction = "right";}
            else if(this.move.up)   {direction = "up";}
            else {direction = "down";}
            
            
            pos = [e[0].obj.x, e[0].obj.y, direction, channelNumber];
            socket.emit("teleport", pos);
            this.destroy();
        }