function(err, exists, record) {
      if (exists === true && record !== 'undefined') {
        // Is an existing file so get its machine name.
        movieFile.setMachineFileName(record.machineFileName);
        movieFile.setId(record._id);
        console.log(record);
      }
      else {
        // Is a new file so give it a machine name.
        movieFile.createNewMachineFileName();
      }
      //Create a new Entry in The Files Variable.
      var machineName = movieFile.getMachineFileName();
      files[machineName] = movieFile;
      prepareToUpload(files[machineName]);
    }