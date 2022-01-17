function(err, res) {
      if(err) {
        self.handleScriptError(err, response);
      }
      else {
        self.doResponse(res, response);
      }
    }