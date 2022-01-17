function(email) {
      var parts = email.split('@');

      if (parts.length < 2) {
        return false;
      }
      
      for (var i = 0; i < parts.length; i++) {
        if (parts[i] === '') {
          return false;
        }
      }

      return {
        domain: parts.pop(),
        address: parts.join('@')
      }
    }