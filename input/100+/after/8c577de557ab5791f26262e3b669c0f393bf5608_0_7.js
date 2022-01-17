function(error, exists, doc) {
          console.log('files[machineName].exists');
          if (error) {
            console.log(error);
          }
          else if (exists === false) {
            // Is a new file, so save it to database.
            console.log('save');
            files[machineName].save(function(err, data) {
              if (err) {
                throw err;
              }
            });
          }
          else if (exists === true) {
            // Update existing database record.
//            files[machineName].setAmountUploaded(files[machineName].getAmountUploaded() + files[machineName].getData().length);
            files[machineName].setId(doc._id);
            console.log('Update');
            files[machineName].update(function(error, success) {
              if (error) {
                throw error;
              }
              console.log('Record successfully updated.');
            });
          }
        }