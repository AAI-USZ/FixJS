function(scale){
        this.scale.x = scale.x; 
        this.scale.y = scale.y; 
        reset_matrix(this);
        return this;
    }