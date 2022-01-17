function _request(method, path, data, cb) {
      if(method == 'GET') {
        jQuery.getJSON(API_URL + path + "?callback=?", data, function(response) {
          console.log(API_URL + path);
          console.log(method);
          console.log(response.data.object);
          cb(response.data.object);
        });
      } else {
        $.ajax({
          type: method,
          url: API_URL + path,
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: 'application/json',
          success: function(res) { cb(null, res); },
          error: function(err) { cb(err); },
          headers : headers()
        });        
      }
    }