function(cssSelector, callback){
  var self = this;
  self.element("css selector", cssSelector, function(err, result){
    if(err && typeof callback == 'function') return callback(err);
    self.elementIdClick(result.value.ELEMENT, function(err, result){
      console.log(result);
      if (typeof callback === "function"){
        callback();
      }
    });
  });
}