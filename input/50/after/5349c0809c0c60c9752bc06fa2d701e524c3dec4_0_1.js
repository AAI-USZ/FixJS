function replaceProtocol (req){
  return 'https://' + req.headers.host + req.url;
}