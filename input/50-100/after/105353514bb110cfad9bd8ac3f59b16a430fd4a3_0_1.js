function(path, cb) {
        $.ajax({
          type: 'GET',
          url: makeURL(path),
          dataType: 'text',
          error: function(data) {
            cb(data);
          },
          success: function(data) {
            cb(null, fixDoctypeHeadBodyMunging(data), baseURL + path);
          }
        });
      }