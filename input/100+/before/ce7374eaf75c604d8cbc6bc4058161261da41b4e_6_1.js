function checkElement() {
    self.direct.element("css selector", cssSelector,
      function(result) {
        var now = new Date().getTime();
        
        if (result.status == 0) {   
          callback(result);
        }else {
          if (now - startTimer < waitForMilliseconds) {
            setTimeout(checkElement, 500);
          }else if (typeof callback === "function"){
            callback(result);
          }
        }
      });
  }