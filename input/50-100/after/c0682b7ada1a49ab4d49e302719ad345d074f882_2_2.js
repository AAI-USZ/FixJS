function() {
        if (this.readyState === 4) {
          try {
            var response = JSON.parse(this.response);
          } catch (err) {
            callback({ error: "an unknown error occured" });
            return;
          }
          callback(response);
        }
      }