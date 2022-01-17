function findDocFor(str, cb) {
  var prefix;
  if(str.substring(0, 'http://'.length)=='http://') {
    prefix = 'http://'.length;
  }
  if(str.substring(0, 'https://'.length)=='https://') {
    prefix = 'https://'.length;
  }
  if(prefix) {
    var domainParts = str.substring(prefix).split('/')[0].split('.');
    if(domainParts.length > 1 && domainParts[1].length >= 2) {
      console.log('doc for '+str);
      cb(null, str);
    }
  }
}