function statsHandler(response) {
      if (response.header.totalBodyLength == 0) {
        serv.removeListener('response', statsHandler);
        callback && callback(null, serv.host + ":" + serv.port, result);
        return;
      }
      switch (response.header.status) {
      case  0:
        result[response.key.toString()] = response.val.toString();
        break;
      default:
        console.log('MemJS STATS: ' + response.header.status);
        callback && callback();
        var errorMessage = 'MemJS DELETE: ' + errors[response.header.status];
        console.log(errorMessage, false);
        callback && callback(new Error(errorMessage, serv.host + ":" + serv.port, null));
      }
    }