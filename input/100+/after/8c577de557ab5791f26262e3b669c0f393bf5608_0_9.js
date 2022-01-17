function (data) {
    // Get machine name of file.
    var machineName;
    var file = _.find(files, function(file) {
      if (file.originalFileName === data.name && file.fileSize === data.fileSize) {
        return true;
      }
    });
    machineName = file.machineFileName;

    files[machineName].setAmountUploaded(files[machineName].getAmountUploaded() + data['data'].length);
    // Add data to data buffer.
    files[machineName].setData(files[machineName].getData() + data['data']);
    // Set time of upload occurence.
    var date = new Date();
    files[machineName].setDateUploaded(date.getTime());
    
    if (files[machineName].getAmountUploaded() == files[machineName].getFileSize())  {
      // File is fully uploaded.
      fs.write(files[machineName].getHandler(), files[machineName].getData(), null, 'binary', function(err, written) {
        // Record file in database.
        files[machineName].exists(function(error, exists, doc) {
          
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
        });
        var input = fs.createReadStream("temp/" + machineName);
        var output = fs.createWriteStream("static/files/" + machineName);
        util.pump(input, output, function(error) {
          // Delete temp media file.
          fs.unlink("temp/" + machineName, function (error) { 
            // Mark file in database as permanent.
            files[machineName].setPermanent(true);
            files[machineName].update(function(error, success) {
              if (error) {
                throw error;
              }
            });
            // Create thumbnails.
            var options = {
              path: '/static/files',
              dimensions: '200x?'
            };
            files[machineName].createThumbnail(options, function(error, thumbName) {
              if (error) {
                throw error;
              }
              else {
               // Move file completed.  Can now generate thumbnail.
                socket.emit('done', {'image' : 'files/' + thumbName});
                // Upload fully complete. Destroy MovieFile object for this file.
                delete files[machineName];
              }
            });
            
          });
        });
      });
    }
    else if (files[machineName].getData().length > 10485760) { 
      // Data Buffer is full (has reached 10MB) proceed to write buffer to file on server.
      fs.write(files[machineName].getHandler(), files[machineName].getData(), null, 'binary', function(err, written) {
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
      });
    }
    else {
      // Data buffer is not full. Get next packet of data from client.
      // Get current upload position.
      var place = files[machineName].getAmountUploaded() / 524288;
      // Get current percentage upload completed.
      var percent = (files[machineName].getAmountUploaded() / files[machineName].getFileSize()) * 100;
      // Send request to client for more file data.
      socket.emit('moreData', { 
        'place': place, 
        'percent': percent
      });
    }
  }