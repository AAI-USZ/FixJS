function copyChildrens(to, from) {
  var push = to.childrens = [];

  // childrens must be copied to propper order
  for (var l = from.childrens.length, i = 0; i < l; i++) {
    push.push(copyElem(from.childrens[i], to));
  }
}