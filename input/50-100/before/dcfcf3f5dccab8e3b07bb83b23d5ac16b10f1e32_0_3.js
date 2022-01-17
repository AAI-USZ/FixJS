function() {
    var params;

    try  {
      self.act(act, JSON.parse(paramString), function(err, res) {
        if(err) {
          self.handleError(err, response);
        }
        else {
          self.doResponse(res, response);
        }
      });
    }
    catch(e) {
      return self.handleError(e, response);
    }

  }