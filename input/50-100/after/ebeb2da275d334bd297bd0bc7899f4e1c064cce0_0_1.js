function(err, result)
      {
        if(ERR(err, callback)) return;
        var pads = [];
        for ( var padId in result ) {
          pads.push(padId);
        }
        callback(null, {padIDs: pads});
      }