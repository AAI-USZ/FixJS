function (repr) {
  var obj = new Annotation(repr, this);
  obj.display();
  this.annotations.push(obj);
  return obj;
}