function(other){
      return all(id, zipWith(__equals, [this['method'], this['path']], [other['method'], other['path']]));
    }