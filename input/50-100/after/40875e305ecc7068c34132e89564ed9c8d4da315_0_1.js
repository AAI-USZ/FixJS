function(m){
        var t = [];
        for(var i = 0; i < this.verticies.length; i++){
          
           t[i] = this.verticies[i].applyTransform(m);

        }
     this.verticies = t;
     
        return this;
    }