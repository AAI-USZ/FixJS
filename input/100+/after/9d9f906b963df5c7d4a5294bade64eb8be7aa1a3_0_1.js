function(event) {
  var controller = event.data.scope;
  
  if (controller.isActive) {
    for(var key in controller.keys) {
      if(key == event.keyCode) {
        if(controller.keysState[key] !== true || controller.repetitiveInput) {
          controller.jarallax.setProgress(controller.jarallax.progress + controller.keys[key]);
        }
        controller.keysState[key] = true;
        if(controller.preventDefault) {
          event.preventDefault(); 
        }
      }
    }
  }
}