function(cssSelector, callback){
  var self = this;
  self.element("css selector", cssSelector, function(err, result){
    if(err && typeof callback == 'function') return callback(err);
    self.elementIdClear(result.value.ELEMENT, function(err, result){
      if(typeof callback === "function"){
        callback();
      }
    });
  });
}