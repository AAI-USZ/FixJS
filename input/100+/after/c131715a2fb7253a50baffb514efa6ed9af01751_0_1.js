function(event){
    throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
  }