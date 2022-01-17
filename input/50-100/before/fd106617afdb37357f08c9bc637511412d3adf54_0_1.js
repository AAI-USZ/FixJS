function(prop, value){
    this.prop = prop;
    this.value = value;
    if (this.supportType.indexOf(prop) == -1) return;
    this.attributes = {};
    this.multValue(value.split(' '));
  }