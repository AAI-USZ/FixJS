function() {
    var server;
    server = "http://fimo.herokuapp.com";
    return {
      load: function(page, callback) {
        return $.ajax({
          url: "" + server + "/" + page,
          dataType: "jsonp",
          success: function(data) {
            if (console) {
              console.log(data);
            }
            return callback(data);
          }
        });
      },
      post: function(page, data, callback, errorCallback) {
        console.log("posting to " + server + "/" + page);
        return $.ajax({
          type: 'POST',
          url: "" + server + "/" + page,
          dataType: "json",
          data: data,
          success: function(data) {
            if (callback) {
              return callback(data);
            }
          },
          error: function(data, error, exception) {
            if (console) {
              console.log("error from ajax request: " + error + ", " + exception);
            }
            if (errorCallback) {
              return errorCallback();
            }
          }
        });
      }
    };
  }