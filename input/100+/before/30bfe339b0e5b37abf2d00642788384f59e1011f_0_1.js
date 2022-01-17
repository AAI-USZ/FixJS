function (name) {
  function error() {
    throw new Error('invalid name: ' + name);
  }
  
  if(name && typeof name == 'string') {
    name = name.trim();
    name = name.replace(/ +/g, '-');
    name = name.replace(/\.+/g, '-');
    
    if(name.match(/^[0-9a-z][0-9a-z-]{1,18}[0-9a-z]$/i)) {
      return name;
    } else {
      error();
    }
  } else {
    error();
  }
}