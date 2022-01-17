function(id, data, callback) {
      var url = server + "/api/project/";

      if ( id ) {
        url += id;
      }

      XHR.post( url, data, function() {
        if (this.readyState === 4) {
          try {
            var response = JSON.parse(this.response);
            callback(response);
          } catch (err) {
            callback({ error: "an unknown error occured" });
          }
        }
      }, "application/json" );
    }