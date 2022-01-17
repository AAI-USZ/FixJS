function(target){
  var __ref;
  if (!((__ref = target.prelude) != null && __ref.isInstalled)) {
    __import(target, exports);
    target.prelude.isInstalled = true;
  }
}