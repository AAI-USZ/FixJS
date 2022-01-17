function(err, pad)
  {
    if(ERR(err, callback)) return;
    callback(null, {lastEdited: pad.getLastEdited()});
  }