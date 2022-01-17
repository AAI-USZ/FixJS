function(event) {
  var controller = event.data.scope;
  
  if (controller.isActive) {
    for(var key in scope.keys) {
      if(key == event.keyCode) {
        if(scope.keysState[key] !== true || scope.repetitiveInput) {
          scope.jarallax.setProgress(scope.jarallax.progress + scope.keys[key]);
        }
        scope.keysState[key] = true;
        if(scope.preventDefault) {
          event.preventDefault(); 
        }
      }
    }
  }
}