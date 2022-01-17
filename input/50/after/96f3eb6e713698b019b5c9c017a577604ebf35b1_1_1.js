function(err) {
              if(err) {
                errors.push(file);
              }
              stream.destroy();
              next();
            }