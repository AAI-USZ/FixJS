function(){
               
        var mag = this.getMagnitude();
        this.x /= mag;
        this.y /= mag; 
        this.z /= mag;
    }