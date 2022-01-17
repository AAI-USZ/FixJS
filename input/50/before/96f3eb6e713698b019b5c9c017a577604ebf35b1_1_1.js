function(err) {
              errors.push(file);
              stream.destroy();
              next();
            }