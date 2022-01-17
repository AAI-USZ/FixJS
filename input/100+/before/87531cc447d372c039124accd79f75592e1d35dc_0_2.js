function writeToMarker(data){
    logger.oraResp('writeToMarker');
    var bLen = data.length;
    if (data.slice(bLen - endMark.length).toString('utf8') !== endMark) {
      res.write(data);
      md5Content && md5Content.write(data);
    } else {
      res.end(data.slice(0, bLen - endMark.length));
      md5Content && md5Content.end(data.slice(0, bLen - endMark.length));
      follow || DBInMgr.pushBackToFreelist(oraSock);
      logger.oraResp('\n-- end response with marker --');
    }
  }