function(act) { 
  if(action == undefined) {
    action = act;
  } else {
    console.log('');
    console.log('Multiple action commands have been sent to redis_mon');
    console.log('Please either use -c set, -c get, -s (for set) or -g (for get)');
    console.log('');
    process.exit(1);
  }
}