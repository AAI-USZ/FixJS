function process_header(data){
    logger.turn('NO.%d first respond', reqCount);
    var hLen = parseInt(data.slice(0, 5).toString('utf8'), 10);
    logger.oraResp("hLen=" + data.slice(0, 5).toString('utf8'));
    var oraResHead = data.slice(5, 5 + hLen - 2).toString('utf8').split(CRLF);
    logger.oraResp(oraResHead);
    var bodyChunk = data.slice(5 + hLen, data.length);
    var status = oraResHead[0];
    for (var i = 1; i < oraResHead.length; i++) {
      var nv = oraResHead[i].split(": ");
      if (nv[0] === 'Set-Cookie') {
        if (ohdr[nv[0]]) ohdr['Set-Cookie'].push(nv[1]);
        else ohdr['Set-Cookie'] = [nv[1]];
      } else {
        ohdr[nv[0]] = nv[1];
      }
    }

    // cause feedback to follow in the same oraSock
    if (ohdr.Location && ohdr.Location.substr(0, 12) === 'feedback?id=') {
      ohdr.Location += (++curFeedbackSeq);
      res.writeHead(status, ohdr);
      res.end();
      follow = true;
      oraSock.removeListener('data', accept_oracle_data);
      fbSocks[curFeedbackSeq] = oraSock;
      return;
    }

    // cause css link to follow in the same oraSock
    if (css_md5 = ohdr['x-css-md5']) {
      follow = true;
      //oraSock.removeListener('data', accept_oracle_data);
      if (cssSocks[css_md5]) {
        cssSocks[css_md5].push(oraSock);
      } else {
        cssSocks[css_md5] = [oraSock];
      }
    }

    logger.oraResp('\n--- response headers ---');
    logger.oraResp(ohdr);
    if (cLen = ohdr['Content-Length']) {
      cLen = parseInt(cLen);
    }

    if (cfg.use_gw_cache && ohdr['ETag'] && status != 304) {
      md5val = ohdr['ETag'].substr(1, 24);
      if (cachedEntity = Cache.findCacheHit(req.url, md5val)) {
        oraSock.write('Cache Hit' + CRLF);
        cachedEntity.respond(req, res);
        DBInMgr.pushBackToFreelist(oraSock);
        return;
      } else {
        oraSock.write('Cache Miss' + CRLF);
        // todo : save http response header and body in cache
        md5Content = new Cache.MD5Content(md5val, ohdr, cLen);
        ohdr['x-pw-noradle-cache'] = 'miss';
      }
    }

    if (ohdr['Content-MD5'] === '?') {
      buffered_response = true;
      res = new MD5Calc(function(len, md5, chunks){
        res = bakRes;
        delete ohdr['Transfer-Encoding'];
        ohdr['Content-Length'] = len;
        ohdr['Content-MD5'] = md5;
        res.writeHead(status, ohdr);
        chunks.forEach(function(chunk){
          res.write(chunk);
        });
        res.end();
      });
    }

    if ((compress = chooseZip(req)) &&
      (ohdr['Content-Encoding'] === 'zip' || (ohdr['Content-Encoding'] === '?' && (cLen || -1) > cfg.zip_threshold))) {
      ohdr['Content-Encoding'] = compress;
      // todo: remember to write x-pw-gzip-ratio as trailer
      if (ohdr['Content-Length']) {
        ohdr['x-pw-content-length'] = ohdr['Content-Length'];
        delete ohdr['Content-Length'];
        ohdr['Transfer-Encoding'] = 'chunked';
      }
      compress = zipMap[compress]();
      compress.pipe(res);
      res = compress;
    } else {
      delete ohdr['Content-Encoding'];
    }
    buffered_response || bakRes.writeHead(status, ohdr);
    oraHeaderEnd = true;

    if (cLen === 0) {
      res.end();
      logger.oraResp('\n-- end response with zero content length --');
      DBInMgr.pushBackToFreelist(oraSock);
      return;
    }

    if (bodyChunk.length) {
      logger.oraResp('\nfirst chunk has http header and parts of http body !');
      logger.oraResp('coupled http body size is %d', bodyChunk.length);
      if (cLen) {
        writeToLength(bodyChunk);
      } else {
        writeToMarker(bodyChunk);
      }
    }
  }