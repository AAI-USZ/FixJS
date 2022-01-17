function(response) {
          try {
            response = jQuery.parseJSON(response);
            if (response.error) {
              return alert(response.error);
            } else {
              return callback(response);
            }
          } catch (e) {
            return typeof console !== "undefined" && console !== null ? console.error('Malformed response', response) : void 0;
          }
        }