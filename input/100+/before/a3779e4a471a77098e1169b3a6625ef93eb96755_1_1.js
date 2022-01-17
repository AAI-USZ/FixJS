function(self) {
  if(self.type == 'singleton') {
    var object = this.funcall(self.object, 'to_s').value;
    return this.string_new("#<Class:" + object + ">");
  } else {
    return this.string_new(this.class2name(self));
  }
}