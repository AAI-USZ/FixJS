function(act) { 
  if(action == undefined) {
    action = act;
  } else {
    help.multiAtion()
    process.exit(1);
  }
}