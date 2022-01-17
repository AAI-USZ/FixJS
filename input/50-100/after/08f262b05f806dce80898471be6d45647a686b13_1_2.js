function(key, data, client, cb) {
  client.set(key, data, redis.print);

  // This is needed to make certain set is complete before exiting program
  runGetCommand(key, client, function(err, result) {
    if (err) {
      return cb(err); 
    }
    if (result == data) {
      console.log(result + ' assigned to key ' + key);
      return cb(null, result);
    }
  });
}