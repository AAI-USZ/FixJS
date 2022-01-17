function copyChildrens(to, from) {
  var push = to.childrens = [];

  var i = from.childrens.length;
  while(i--) {
    push.push(copyElem(from.childrens[i], to));
  }
}