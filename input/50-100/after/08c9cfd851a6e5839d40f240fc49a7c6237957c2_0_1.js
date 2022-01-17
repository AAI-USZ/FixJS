function() {
  var toReturn = [];
  
  for(var i = 0; i < this.args.length; i++) {
      toReturn.push(''+args[i]);
  }
  
  return toReturn.join("");
}