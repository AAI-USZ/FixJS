function(distance) {
        if (this.state && this.state.gameArea) {
            var bounds = this.state.gameArea;
            var size = this.getSize();
            var x = this.x, y = this.y;
            distance = distance || 0;
            return ( 
                x + distance < bounds.x + size.x / 2 || 
                y + distance < bounds.y + size.y / 2 ||  
                x - distance > bounds.width + bounds.x + size.x / 2 || 
                y - distance > bounds.height + bounds.y - size.y / 2 
            );
        }
        return false;
    }