function MovieFile(mongoose) {
  var Movie = mongoose.model('Movie');
  this.id;
  this.name;
  this.data;
  this.downloaded;
  this.handler;
  this.fileSize = 0;
  this.machineFileName;
//  this.Movie = mongoose.model('Movie');
  this.originalFileName;
  this.permanent = false;
 
   /**
   * Check if record for this movie file exists in the database.
   * 
   * Record is check based on file name and file size. 
   * 
   * @param function Next
   *   function called on completion of this method.
   * @return
   *   error - Error object
   *   exists - Boolean denoting is record for this file exists in database.
   *   record - Object containing database record. Only returned if record exists is true. 
   */
  this.exists = function(next) {
    // Confirm necessary object variables have been set.
    if (typeof this.originalFileName === 'undefined') {
      throw error = new Error('Variable originalFilename has not been set for MovieFile.');
    }
    if (typeof this.fileSize !== 'number') {
      throw error = new Error('Variable originalFilename has not been set for MovieFile.');
    }
    // Check database for existing record.
    Movie
      .find({ originalFileName: this.originalFileName, size: this.fileSize })
      .exec(function(error, results) {
//        error = new Error('Opps something went wrong.');
        if (error) {
          next(error, undefined);
        }
        else if (results.length === 0) {
          next(null, false);
        }
        else if (results.length === 1) {
          // If contains a record then return that record along with true.
          next(null, true, results[0]);
        }
        else {
          error = new Error('More than one record for this movie record exists.');
          next(error, undefined);
        }
      });
  };

  this.fetch = function(name, size) {};
  
  this.getData = function() {
    return this.data;
  };
  
  this.setData = function(data) {
    this.data = data;
  };
  
  this.getAmountUploaded = function() {
    return this.downloaded;
  };
  this.setAmountUploaded = function(amount) {
    this.downloaded = amount;
  };
  this.getFileSize = function() {
    return this.fileSize;
  };
  this.setFileSize = function(size) {
    this.fileSize = size;
  };
  this.getHandler = function() {
    return this.handler;
  };
  this.setHandler = function(handler) {
    this.handler = handler;
  };
  this.createNewMachineFileName = function() {
    var date = new Date();
    this.machineFileName = date.getTime();
    return this.machineFileName;
  };
  this.getMachineFileName = function() {
    return this.machineFileName;
  };
  this.getId = function() {
    return this.id;
  };
  this.setId = function(id) {
    this.id = id;
  };
  this.setMachineFileName = function(machineFileName) {
    this.machineFileName = machineFileName;
  };
  this.getName = function() {
    return this.name;
  };
  this.setName = function(name) {
    this.name = name;
  };
  this.getOriginalFileName = function() {
    return this.originalFileName;
  };
  this.setOriginalFileName = function(originalFileName) {
    this.originalFileName = originalFileName;
  };  
  
  this.getPermanent = function() {
    return this.permanent;
  };
  
  this.setPermanent = function(value) {
    if (typeof value !== 'boolean') {
      throw error = new Error('Provided argument must be a Boolean.');
    }
    this.permanent = value;
  };
  
  this.save = function() {
    console.log('save file');
    // save movie to database.
    var values = {
      name: this.getName(),
      machineFileName: this.getMachineFileName(),
      originalFileName: this.getName(),
      size: this.getFileSize(),
      type: 'unknown',
//      dateUploaded: Date,
      amountUploaded: this.getAmountUploaded(),
      permanent: this.getPermanent(),
      viewed: 0,
      uid: 0,
      flags: [],
      tags: []
    };
    var movie = new Movie(values);
    movie.save(function(error, data) {
      if (error) {
        console.log(error);
      }
      else {
        console.log('Movie saved.');
      }
    });
  };
  this.refresh = function() {
    // Refresh movie with values from database.
  };
  
  this.update = function(next) {
    if (typeof this.id === 'undefined') {
      var error = new Error('Cannot complete MovieFile.updage as MovieFile.id is not defined.');
      next(error, undefined);
    }
    else {
      var values = {
//          _id: this.getId(),
          name: this.getName(),
          machineFileName: this.getMachineFileName(),
          originalFileName: this.getName(),
          size: this.getFileSize(),
          type: 'unknown',
//          dateUploaded: Date,
          amountUploaded: this.getAmountUploaded(),
          permanent: this.getPermanent(),
          viewed: 0,
          uid: 0,
          flags: [],
          tags: []
        };
//        var movie = new Movie(values);
        var conditions = { _id: this.id };
        var options = {};
        Movie.update(conditions, values, options, function(error, data) {
          if (error) {
            console.log(error);
          }
          else {
            next(null, data);
          }
        });
    }
  };
}