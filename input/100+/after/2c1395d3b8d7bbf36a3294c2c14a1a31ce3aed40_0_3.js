function(idx) {
    switch(typeof idx) {
      case 'string':
      if(this.name.hasOwnProperty(idx)) {
        return this.name[idx];
      } else {
        var s = this.schema.value.get(idx);
        var ret = create_element(s);
        this.name[idx] = ret;
        this.index[s.index.toString()] = ret;
        return ret;
      }

      case 'number':
      if(this.index.hasOwnProperty(idx.toString())) {
        return this.index[idx.toString()];
      } else {
        var s = this.schema.value.get(idx);
        var ret = create_element(s);
        this.name[s.name] = ret;
        this.index[idx.toString()] = ret;
        return ret;
      }

      default: console.assert(false);
    }
  }