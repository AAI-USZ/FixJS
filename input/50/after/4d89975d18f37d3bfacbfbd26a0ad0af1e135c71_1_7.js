function(source, target) {
  this.setter_.call(target, this.getter_.call(source));
}