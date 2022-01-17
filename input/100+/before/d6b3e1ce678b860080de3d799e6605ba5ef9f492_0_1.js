function (err) {
    if (err) {
      callback(err);
      return;
    }
    var todo = 2;
    function finish(err) {
      if (err) {
        todo = 0;
        callback(err);
        return;
      }
      todo--;
      if (todo === 0) {
        callback();
      }
    }
    fs.writeFile(path.join(dir,'..','.userconfig'), '', finish);
    fs.writeFile(path.join(dir,'..','.globalconfig'), '', finish);
  }