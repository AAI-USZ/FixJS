function(req, res) {
        return "Howdy, " + req.session.currentUser + "!";
      }