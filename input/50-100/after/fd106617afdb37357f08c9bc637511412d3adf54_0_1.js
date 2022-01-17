function(prop, value){
    this.prop = prop;
    this.value = value;
    if (this.supportType.indexOf(prop) == -1) return;
    this.attributes = {};
    //过滤多个空格
    this.multValue(value.replace(/\s+/g, ' ').split(' '));
  }