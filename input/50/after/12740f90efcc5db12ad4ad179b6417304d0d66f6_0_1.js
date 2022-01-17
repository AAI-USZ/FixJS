function(){
    if (readline.line || code) {
      say('');
      reset();
    } else {
      readline.close();
    }
  }