function(chemical){
  for(var i = 0; i<this._listeners.length; i++) {
    var listener = this._listeners[i];

    if(chemical.type && listener.chemicalPattern === chemical.type) {
      if(listener.handle(chemical)) return;
    } /*else
    if(listener.chemicalPattern.match && listener.chemicalPattern.match(chemical)) {
      if(listener.handle(chemical)) return;
    } else
    if(listener.chemicalPattern === chemical) {
      if(listener.handle(chemical)) return;
    }*/
  }
}