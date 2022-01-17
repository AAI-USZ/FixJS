function(){
    if (rl.line || code) {
      say('');
      reset();
    } else {
      rl.close();
    }
  }