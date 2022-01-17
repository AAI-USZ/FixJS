function writeToLength(data){
    logger.oraResp('writeToLength');
    bytesRead += data.length;
    logger.turn('NO.%d received chunk %d/%d. cLen=%d', reqCount, data.length, bytesRead, cLen);
    if (bytesRead < cLen) {
      res.write(data);
      md5Content && md5Content.write(data);
    } else if (bytesRead === cLen) {
      res.end(data);
      md5Content && md5Content.end(data);
      // oraSock.pause();
      follow || DBInMgr.pushBackToFreelist(oraSock);
    } else {
      console.error(data.toString());
      DBInMgr.reportProtocolError(oraSock);
      var errmsg = 'received data is more than Content-Length header said';
      res.writeHead(500, 'Internal Server Error', {
        'Content-Length' : errmsg.length,
        'Content-Type' : 'text/plain',
        'Retry-After' : '3'
      });
      res.end(errmsg);
    }
  }