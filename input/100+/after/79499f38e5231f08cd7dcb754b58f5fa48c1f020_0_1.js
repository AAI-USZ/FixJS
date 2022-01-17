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