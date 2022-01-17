function() {
  var toReturn = [];
  
  for(var i = 0; i < args.length; i++) {
      toReturn.push(''+args[i]);
  }
  
  return toReturn.join("");
}