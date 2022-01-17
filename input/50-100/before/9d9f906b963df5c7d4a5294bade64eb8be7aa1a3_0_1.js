function(event) {
  if (this.isActive) {
    var scope = event.data.scope;
    for(var key in scope.keys) {
      if(key == event.keyCode) {
        scope.keysState[key] = false;
      }
    }
  }
}