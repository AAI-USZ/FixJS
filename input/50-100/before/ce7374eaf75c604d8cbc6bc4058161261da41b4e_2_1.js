function(result) {
      if (result.status == 0) {
        self.elementIdValue(result.value.ELEMENT,
          function(result) {
            if (typeof callback === "function") {
              callback(result.value);
            }
          });
      }else {
        if (typeof callback === "function") {
          callback(result.value);
        }
      }
    }