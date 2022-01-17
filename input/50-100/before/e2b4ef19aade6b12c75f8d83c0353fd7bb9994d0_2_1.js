function() {
        var user;
        user = loadUser();
        if (user) {
          return fimo.data.post('login', {
            'email': user.email,
            'password': user.password
          }, function() {
            return fimo.controller.jumbles();
          }, function() {
            console.log("automatic login unsuccessful. removing local storage user.");
            return window.localStorage.removeItem('user');
          });
        }
      }