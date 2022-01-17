function(host, port, command, key, data) {
  if(host == undefined) {
    console.log('redis_mon requires a host to connect');
    help.smallHelp();
  }
  else if(port == undefined) {
    console.log('redis_mon requires a port to connect');
    help.smallHelp();
  }
  else if(command == undefined) {
    console.log('redis_mon requires a command to do a set or get (-c set/get or -s/-g)');
    help.smallHelp();
  } 
  else if(key == undefined) {
    console.log('redis_mon requires a key to set or get a value');
    help.smallHelp();
  }
  else if(data == undefined && key == 'set') {
    console.log('redis_mon requires data in order to set a key/value');
    help.smallHelp();
  } else {
    return true;
  }
  process.exit(1);
}