function(email) {
      var parts = email.split('@');

      if (parts.length < 2) {
        return false;
      }

      return {
        domain: parts.pop(),
        address: parts.join('@')
      }
    }