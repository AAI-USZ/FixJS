function() {
        if (this.readyState === 4) {
          var response;
          try {
            response = JSON.parse(this.response);
          } catch (err) {
            callback({ error: "an unknown error occured" });
            return;
          }
          callback(response);
        }
      }