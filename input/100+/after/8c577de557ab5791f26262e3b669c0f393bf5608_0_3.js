function(file) {
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
  }