function set(key, value){
    var val = style.call(this.source, this.extended);
    value ? (val |= this.values[key]) : (val &= ~this.values[key]);
    style.call(this.source, val, this.extended);
  }