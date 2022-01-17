function(err, outStat){

    // If the output file doesn't exist, then definitely process this file
    if(err && err.code == 'ENOENT') return callback(true);

    fs.stat(file, function(err, inStat){
      // Process the file if the input is newer than the output
      callback(+inStat.mtime > +outStat.mtime);
    });
  }