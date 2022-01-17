function(p) {
      console.log("changing page: " + p + " fecth: " + this._fetching);
      if(!this._fetching && p >= 0) {
        console.log("changed page: " + p + " now " + this.options.get('page'));
        this.setOptions({page: p});
      }
    }