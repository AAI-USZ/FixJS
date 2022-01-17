function(err,data){
    if(err) {
      watcher.close();
      fs.unlink(logFile);
      throw err;
    }
  }