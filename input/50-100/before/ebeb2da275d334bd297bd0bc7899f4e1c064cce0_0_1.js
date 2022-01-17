function(err, pads)
      {
        if(ERR(err, callback)) return;
        callback(null, {padIDs: pads});
      }