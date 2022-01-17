function ( val ){
    return val.toString().length < len ?
      { error : msg } :
      { valid: true };
  }