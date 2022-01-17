function replaceProtocol (req){
  return req.url.replace(/^http:/i, 'https:');
}