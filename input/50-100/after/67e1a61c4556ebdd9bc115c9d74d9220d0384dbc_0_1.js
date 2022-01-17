function validChar(c,isFirst) {
    var code = c.charCodeAt(0);
    return (code >= 65 && code <= 90)
        || (code >= 97 && code <= 122)
        || (code === 95) // '_'
        || (code === 36) // '$'
        || ((code >= 47 && code <= 57)  && !isFirst) // 0-9
  }