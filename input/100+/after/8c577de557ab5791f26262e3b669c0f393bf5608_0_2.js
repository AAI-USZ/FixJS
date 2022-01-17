function (socket) {
  
  // 
  var prepareToUpload = function(file) {
    var machineName = file.getMachineFileName();
    var place = 0;
    try {
      // Is the file already present on server.
      var stat = fs.statSync('temp/' +  machineName);
      if (stat.isFile()) {
        // Update file information with size of already uploaded portion of file.
        file.setAmountUploaded(stat.size);
        // Set starting place for continuation of uploading.
        place = stat.size / 524288;
      }
    }
    catch (error) {
      // No file present? Must be a new upload.
      console.info('No file present, must be new file.');
    } 
    fs.open("temp/" + machineName, "a", 0755, function(error, fd) {
      if (error) {
         console.log(error);
      }
      else {
        // Store file handler so can be written to later.
        file.setHandler(fd);
        // Fetch file data from client. 
        socket.emit('moreData', { 
          'place': place, 
          percent: 0 
        });
      }
    });
  };
  
  // Start uploading process
  //   @param data contains the variables passed through from the html file.
  socket.on('start', function (data) { 
    var name = data.name;
    var size = data.fileSize;
    // Create instance of MovieFile object.  
    var movieFile = new MovieFile(mongoose);
    movieFile.setName(name);
    movieFile.setOriginalFileName(name);
    movieFile.setFileSize(size);
    movieFile.setData('');
    movieFile.setAmountUploaded(0);
    // Get the machine name for the file.
    movieFile.exists(function(err, exists, record) {
      if (exists === true && record !== 'undefined') {
        // Is an existing file so get its machine name.
        movieFile.setMachineFileName(record.machineFileName);
        movieFile.setId(record._id);
        console.log(record);
      }
      else {
        // Is a new file so give it a machine name.
        movieFile.createNewMachineFileName();
        movieFile.save(function(err, data) {
          if (err) {
            throw error;
          }
        });
      }
      //Create a new Entry in The Files Variable.
      var machineName = movieFile.getMachineFileName();
      files[machineName] = movieFile;
      prepareToUpload(files[machineName]);
    });
  });
  
  socket.on('upload', function (data) {
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
  });
}