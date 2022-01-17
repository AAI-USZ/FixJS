function() {
    console.log("hitting first part of middleware");
    return function(req, res, next) {
      console.log("in middleware function");
      if (req.body.signed_request) {
        console.log("in signed_request part");
        self.parse_signed_request(req.body.signed_request, function(decoded_signed_request) {
          req.facebook = new FaceplateSession(self, decoded_signed_request);
          console.log(req.facebook);
          next();
        });
      } else if (req.cookies["fbsr_" + self.app_id]) {
        self.parse_signed_request(req.cookies["fbsr_" + self.app_id], function(decoded_signed_request) {
          req.facebook = new FaceplateSession(self, decoded_signed_request);
          next();
        });
      } else {
        req.facebook = new FaceplateSession(self);
        next();
      }
    }
  }