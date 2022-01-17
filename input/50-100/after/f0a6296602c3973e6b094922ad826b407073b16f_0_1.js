function(err, resp){
    if(err || resp.statusCode != 200) {
      fs.unlinkSync(fetch_target);
      return cb(new Error('Couldn\'t fetch '+version+' ('+(err? err.message : 'HTTP '+resp.statusCode)+')'));
    }
    cb();
  }