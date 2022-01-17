function(error, exists, doc) {
          
          if (error) {
            console.log(error);
          }
          else if (exists === false) {
            // Is a new file, so save it to database.
            files[machineName].save(function(err, data) {
              if (error) {
                throw error;
              }
            });
          }
          else if (exists === true) {
            // Update existing database record.
            files[machineName].setId(doc._id);
            files[machineName].update(function(error, success) {
              if (error) {
                throw error;
              }
            });
          }
        }