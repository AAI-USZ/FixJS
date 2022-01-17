function callOra(db, dbu, prog, params, headers, cb){
  var oraSock = findFreeOraLink()
    , self = this
    , parts = prog.split('.')
    , oraStatus
    , oraResHead2
    , resultLength
    , readBytes = 0
    , result = []
    , mimeType
    , bMsgStream
    , remained = []
    , msgSectLen
    , accSectLen
    , msgEmitter = new EV() // maybe oraSock on data or new msg in message stream
    ;
  oraSock.busy = true;
  oraSock.write(TypeMarker + CRLF); // mark start of node2oracle direct call
  oraSock.write(dbu + CRLF);
  oraSock.write(prog + CRLF);
  oraSock.write(parts.pop() + CRLF);
  oraSock.write((parts.pop() || '') + CRLF);
  oraSock.write(CRLF); // for empty headers
  oraSock.write(formatParam(params));
  oraSock.write(CRLF); // for end marker of params

  /**
   * for the request/response type
   * will emit received data chunks as data event, and emit end, error events
   * @param data one chunk received from oracle database
   */
  function writeToLength(data){
    readBytes += data.length;
    result.push(data.toString('utf-8'));
    msgEmitter.emit('data', data);
    if (readBytes === resultLength) {
      result = result.join('');
      oraSock.removeListener('data', acceptOracleResult);
      oraSock.busy = false;
      cb && cb(oraStatus, result, oraResHead2);
      msgEmitter.emit('end', null);
    }
  }

  /**
   * for the acceptance from oracle message stream
   * @param data
   * @param startPos
   */
  function parseStream(data, startPos){
    if (!data || data.length === 0)
      return;
    var endPos, msg;
    if (!msgSectLen) {
      msgSectLen = data.readUInt32BE(startPos, true);
      startPos += 4;
      accSectLen = 0;
    }
    endPos = startPos + (msgSectLen - accSectLen);
    logger(data.length, data.toString(), startPos, endPos, accSectLen, msgSectLen);
    if (data.length >= endPos) {
      remained.push(data.toString('utf8', startPos, endPos));
      msg = remained.join('');
      cb && cb(null, msg);
      msgEmitter.emit('message', msg);
      self.emit(DBCall.evDBMsg, msg);
      remained = [];
      msgSectLen = 0;
      if (data.length > endPos)
        parseStream(data, endPos);
    } else {
      remained.push(data.toString('utf8', startPos));
      accSectLen += (data.length - startPos);
    }
  }

  function acceptOracleResult(data){
    logger(data.length, 'accept data length');
    if (!oraResHead2) {
      // first data arrived
      var hLen = parseInt(data.slice(0, 5).toString('utf8'), 10)
        , oraResHead = data.slice(5, 5 + hLen - 2).toString('utf8').split(CRLF)
        , bodyChunk = data.slice(5 + hLen, data.length)
        ;
      oraStatus = parseInt(oraResHead.shift().split(' ').shift());
      oraResHead2 = {};
      oraResHead.forEach(function(nv){
        nv = nv.split(": ");
        oraResHead2[nv[0]] = nv[1]; // todo: multi occurrence headers not supported by now
      });
      logger(oraResHead2);
      mimeType = oraResHead2['Content-Type'];
      bMsgStream = !mimeType.indexOf('text/noradle.msg.stream');
      if (bMsgStream) {
        oraSock.on('end', function(){
          cb && cb(null, null); // signal end of message stream
          msgEmitter.emit('end', null);
        });
      } else {
        resultLength = parseInt(oraResHead2['Content-Length']);
      }
      if (!bMsgStream && !resultLength) {
        oraSock.removeListener('data', acceptOracleResult);
        oraSock.busy = false;
        cb(new Error('this version of node2oracle direct call do not support chunked transfer encoding for oracle result.'));
        return;
      }
      if (bMsgStream)
        parseStream(bodyChunk);
      else
        writeToLength(bodyChunk);
    } else {
      if (bMsgStream)
        parseStream(data, 0);
      else
        writeToLength(data);
    }
  }

  oraSock.on('data', acceptOracleResult);

// all standard request header info have been sent to oracle by now
  return msgEmitter; // so can write like http post to send lines of input to oracle
}