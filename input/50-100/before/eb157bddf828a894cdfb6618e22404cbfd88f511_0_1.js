function(err, resp) {
            if (err != null) {
              console.log(err);
            }
            if (resp != null) {
              return resp.on('data', function(data) {
                return console.log(data.toString());
              });
            }
          }