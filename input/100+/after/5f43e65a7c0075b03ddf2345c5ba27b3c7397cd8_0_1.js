function (identifier) {
  var nameRe = /[^A-Za-z_0-9]/g;
  return identifier.replace(nameRe, "_");
}