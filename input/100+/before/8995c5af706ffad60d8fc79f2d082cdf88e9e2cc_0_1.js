function(html){
    var changeEvents = this.events['change'];
    if (changeEvents && changeEvents.length > 0 && html != this.lastHtml) {
  
      var window = this.initBrowserWindow(html);

      for(var i=0; i<changeEvents.length; i++) {
        
        if (!changeEvents[i].selector) {
          changeEvents[i].callback(html, this.lastHtml);
        }
        else {
          var result = window.document.querySelector(changeEvents[i].selector);
          var lastResult = changeEvents[i].lastResult;

          if (result) 
            result = result.outerHTML;

          if (result != lastResult){
            changeEvents[i].callback(result, lastResult);
            changeEvents[i].lastResult = result;
          }
        }
      }

      window.close();
    }
  }