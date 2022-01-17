function(urlstr){
  return urlJoin(url.parse(urlstr).path);
}