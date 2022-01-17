function() {
  var toReturn = [];
  var i;
  for(i = 0; i < this.args.length; i++) {
      toReturn.push(''+args[i]);
  }
  
  return toReturn.join("");
}