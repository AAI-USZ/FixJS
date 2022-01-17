function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          self.set("rawText", evt.target.result);
          if(typeof callback == "function"){
            callback();
          }
        }
      }