function(err, resp) {
            if (resp != null) {
              return resp.on('data', function(data) {
                return console.log(data.toString());
              });
            }
          }