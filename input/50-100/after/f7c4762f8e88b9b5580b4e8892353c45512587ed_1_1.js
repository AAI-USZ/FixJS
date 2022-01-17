function(id) {
      if(this.bodiesMap[id]){
        this.world.DestroyBody(this.bodiesMap[id]);
      }
    }