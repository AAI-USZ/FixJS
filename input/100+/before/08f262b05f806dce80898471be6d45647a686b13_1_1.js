function(host, port, command, key, data, timeout) {
  
  // Runs function to check for valid input, program exit if not valid
  isValid(host, port, command, key, data, timeout);
  setTout(timeout);
  client = getClient(host, port);

  if (command == 'set') {
    runSetCommand(key, data, client);
    runGetCommand(key, client, function(err, result) {
      if (err) {
        console.log(new Error(err));
        process.exit(1);
      }
      if (result == data) {
        process.exit(0);
      }
    });
  } else if (command == 'get') {
    runGetCommand(key, client, function(err, response) {
      console.log('');   
      console.log('Value for key ' + key + ' = ' +response);
      process.exit(0);
    });
  }
}