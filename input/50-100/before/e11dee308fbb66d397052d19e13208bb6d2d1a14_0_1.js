function(password) {
          config.password = PasswordHash.generate(password);
          return over();
        }