function BitfieldHandler(values, source, extended){
    this.values = values;
    this.source = source;
    this.extended = extended;
    this.list = Object.keys(values).sort();
    return
  }