function(err, written) {
        console.log('fs.write');
        // Record file in database.
        files[machineName].exists(function(error, exists, doc) {
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
        });
        
        //Reset The Buffer
        files[machineName].setData('');
        // Get current upload position.
        var place = files[machineName].getAmountUploaded() / 524288;
        // Get current percentage upload completed.
        var percent = (files[machineName].getAmountUploaded() / files[machineName].getFileSize()) * 100;
        // Send request to client for more file data.
        socket.emit('moreData', { 
          'place': place, 
          'percent':  percent 
        });
      }