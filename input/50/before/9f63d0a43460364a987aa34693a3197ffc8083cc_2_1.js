function(err,data){
    if(err) {
      watcher.close();
      fs.unlink();
      throw err;
    }
  }