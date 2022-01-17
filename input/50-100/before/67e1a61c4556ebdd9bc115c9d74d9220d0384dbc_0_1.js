function validChar(c) {
    var code = c.charCodeAt(0);
    return (code >= 65 && code <= 90)
        || (code >= 97 && code <= 122)
        || (code === 95) // '_'
        || (code === 36) // '$'    
  }