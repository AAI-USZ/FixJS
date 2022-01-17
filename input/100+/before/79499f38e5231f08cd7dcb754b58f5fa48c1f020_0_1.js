function writeToLength(data){
    readBytes += data.length;
    result.push(data.toString('utf-8'));
    msgEmitter.emit('data', data);
    if (readBytes === resultLength) {
      result = result.join('');
      oraSock.removeListener('data', acceptOracleResult);
      oraSock.busy = false;
      if (oraStatus >= 400 && oraStatus < 600) {
        var err = new Error({errorCode : oraStatus, message : result});
        cb && cb(err);
        msgEmitter.emit('error', err);
      } else {
        cb && cb(null, result, oraResHead2);
        msgEmitter.emit('end', null);
      }
    }
  }