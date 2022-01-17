function(obj, fun) {

  var n = this.undoStack.length;
  if(n == 0) return true;

  var undoEntry = this.undoStack[n - 1];

  if( (undoEntry[0] == obj) && (undoEntry[1] == fun) ) return false;

  return true;

}