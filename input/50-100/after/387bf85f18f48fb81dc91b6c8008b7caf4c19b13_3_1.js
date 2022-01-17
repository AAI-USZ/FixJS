function(path, params) {
  if (path.slice(0, 1) != '/') {
    path = '/' + path;
  }
  console.log("path : ", path + '?' + querystring.stringify(params));
  return path + '?' + querystring.stringify(params);
}