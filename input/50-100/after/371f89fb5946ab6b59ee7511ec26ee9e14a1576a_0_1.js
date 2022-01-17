function(err,data) {
      console.log(err);
      console.log(data);
    var lines = data.toString().trim().split('\n')
      , r=0;
      ;
    for(r=0;r<lines.length;r++){
      lines[r] = lines[r].split(delimiter);
    }
    cb(err,lines);
  }