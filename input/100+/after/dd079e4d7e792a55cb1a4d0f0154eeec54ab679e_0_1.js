function(req, res, next) {
      if (req.body.signed_request) {
        self.parse_signed_request(req.body.signed_request, function(decoded_signed_request) {
          req.facebook = new FaceplateSession(self, decoded_signed_request);
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