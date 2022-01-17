function(response) {
          try {
            response = jQuery.parseJSON(response);
            return callback(response);
          } catch (e) {
            return typeof console !== "undefined" && console !== null ? console.error('Malformed response', response) : void 0;
          }
        }