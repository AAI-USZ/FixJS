function() {
            console.log("automatic login unsuccessful. removing local storage user.");
            return window.localStorage.removeItem('user');
          }