function(chemical){
  var returnValue = false;
  for(var i = 0; i<this._listeners.length; i++) {
    var listener = this._listeners[i];

    if(chemical.type && listener.chemicalPattern === chemical.type) {
      var chemicalReceived = listener.handle(chemical);
      if(typeof chemicalReceived != "undefined")
        return chemicalReceived;
      returnValue = true;
    }
  }
  return returnValue;
}