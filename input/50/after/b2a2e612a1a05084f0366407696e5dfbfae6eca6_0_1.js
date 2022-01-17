function(urlstr){
  var path = url.parse(urlstr).pathname;
  return urlJoin(url.parse(urlstr).pathname);
}