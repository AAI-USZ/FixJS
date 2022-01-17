function(event) {
  if (this.isActive) {
    var controller = event.data.scope;
    for(var key in controller.keys) {
      if(key == event.keyCode) {
        controller.keysState[key] = false;
      }
    }
  }
}