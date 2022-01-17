function str2ascii(str, del)
  {
    var ascii = '';
    str = str.split(del);
    for(var i in str)
      {
        ascii += str[i].charCodeAt(0);
      }
    return ascii;
  }