function getHost(name) {
  // If the given name contains "http:"
  if (/http:/.test(name)) {
    // Prase the URI into all its little bits
    var uri = parseUri(name);
    
    // Store the fact that it is a remote URI
    uri.remote = true;
    
    // Store the user and password as a separate auth object
    uri.auth = {username: uri.user, password: uri.password};
    
    // Split the path part of the URI into parts using '/' as the delimiter
    // after removing any leading '/' and any trailing '/'
    var parts = uri.path.replace(/(^\/|\/$)/g, '').split('/');
    
    // Store the first part as the database name and remove it from the parts
    // array
    uri.db = parts.pop();
    
    // Restore the path by joining all the remaining parts (all the parts
    // except for the database name) with '/'s
    uri.path = parts.join('/');
    
    return uri;
  }
  
  // If the given name does not contain 'http:' then return a very basic object
  // with no host, the current path, the given name as the database name and no
  // username/password
  return {host: '', path: '/', db: name, auth: false};
}