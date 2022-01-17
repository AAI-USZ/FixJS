function(c){
        
        c.fillStyle = this.color;
        
        c.beginPath();
            var r = this.radius;
            
            c.arc(-this.regX + r , -this.regY + r , r, 0, Math.PI*2, true);
        
        c.closePath();
        
        c.fill();
        return this;
    }