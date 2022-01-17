function() {
        if (key) {
          setPassword(password.value, identity.value);
        }
        close();
        if (callback)
          callback();
        return false;
      }