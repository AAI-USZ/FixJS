function(req, res) {
        return "User | role: " + req.session.currentUser + " | " + req.session.currentUserRole;
      }