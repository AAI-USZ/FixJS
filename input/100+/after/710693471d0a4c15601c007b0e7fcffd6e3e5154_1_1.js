function(distance, sizeFactor) {
        if (this.state && this.state.gameArea) {
            var bounds = this.state.gameArea;
            var size = this.getSize();
            var x = this.x, y = this.y;
            distance = distance || 0;
            sizeFactor = sizeFactor || 2;
            return ( 
                x + distance < bounds.x + size.x / sizeFactor || 
                y + distance < bounds.y + size.y / sizeFactor ||  
                x - distance > bounds.width + bounds.x + size.x / sizeFactor || 
                y - distance > bounds.height + bounds.y - size.y / sizeFactor 
            );
        }
        return false;
    }