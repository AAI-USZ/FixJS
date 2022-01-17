function(scale){
        if((typeof scale) === 'number'){
            this.scale.x = scale;
            this.scale.y = scale;
        }else{
            this.scale.x = scale.x; 
            this.scale.y = scale.y; 
        }
        reset_matrix(this);
        return this;
    }