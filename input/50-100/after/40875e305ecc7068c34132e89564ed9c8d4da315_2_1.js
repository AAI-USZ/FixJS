function(){
        for (var i = 0; i < this.faces.length; i++){
            this.faces[i] = this.faces[i].applyTransform(this.transform);
        }
          this.transform.reset();
        return this;
    
    }