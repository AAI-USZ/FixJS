function (name) {
  function error() {
    throw new Error('invalid name: ' + name);
  }
  
  if(name && typeof name == 'string' && name.length) {
    name = name.trim().toLowerCase();
    name = name.replace(/ +/g, '-');
    name = name.replace(/\.+/g, '-');
    name = name.replace(/[^0-9a-z-]/g, '');
    
    if(name.length === 0) error();
    if(name === '-') error();
    
    if(name.length <= 18) {
      return name;
    } else {
      throw new Error("Name must not be more than 18 characters");
    }
  } else {
    error();
  }
}