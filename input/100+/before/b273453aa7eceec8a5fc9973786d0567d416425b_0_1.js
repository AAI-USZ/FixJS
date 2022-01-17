function(req,res,next){
  if(config.mobileOnly){
    req.isMobile = true;
  } else if(config.webOnly){
    req.isMobile = false;
  } else {
    var ua = useragent.parse(req.headers['user-agent']).toString(),
        mobilePattern = /(ios|mobile|wii|webos|tablet|kindle|portable|palm|symbian|blackberry)/i
    if(ua.match(mobilePattern) || useragent.is(req.headers['user-agent']).mobile_safari){
      if(ua.match(/ipad/i)){
        req.isMobile = 'iPad';
      } else {
        req.isMobile = true;
      }
    } else {
      req.isMobile = false;
    }
  }
  next();
}