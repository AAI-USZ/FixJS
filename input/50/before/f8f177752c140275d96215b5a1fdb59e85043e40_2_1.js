function(target){
  if (!target.prelude.isInstalled) {
    __import(target, exports);
    target.prelude.isInstalled = true;
  }
}