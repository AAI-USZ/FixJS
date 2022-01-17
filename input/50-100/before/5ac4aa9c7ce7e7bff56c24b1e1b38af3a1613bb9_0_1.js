function(err, result) {
    if(err) {
      callback({ err: 'there was an error for Player.where()' }, undefined);
    } else {
      console.log("DB RESULT");
      console.log(result);
      console.log(result.length());
      callback(undefined, result);
    }
  }