function(m){
        for(var i = 0; i < this.verticies.length; i++){
            POS3D.Matrix.applyTransform(m,this.verticies);
        }
    }