function(host, serverPort) {
  host = host.substr(0, host.length - serverPort.length);
  var match = host.match(/(.*\.)?(.+?\-(?:myw|xo3|y1q|on4|sxpy|35|42|36|tz|uy|sx)(?:\-..)?)/)
  if(!match) return;
  var sub = match[1] || ''
    , domain = match[2]
    ;
  domain = domain.replace(/--/g, '**')
    .replace(/-/g, '.')
    .replace(/\*\*/g, '-');
  return sub + decodeOld(domain);
}