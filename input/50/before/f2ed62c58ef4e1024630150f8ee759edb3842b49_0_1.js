function () {
      var base = model.baseURL + '/' + this.plural;
      if (this.isNew()) 
        return base + '.json';
      else
        return base + '/' + this.id + '.json';
    }