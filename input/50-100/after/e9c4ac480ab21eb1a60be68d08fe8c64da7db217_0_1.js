function(m){
        for(var i = 0; i < this.verticies.length; i++){
         
            this.verticies[i] =   m.applyTransform(this.verticies[i]);
       
        }
        return new POS3D.Face(this.verticies,this.color);
    }