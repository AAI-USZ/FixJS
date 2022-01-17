function () {
      log.silly('client', 'client connected');

      // 1. Send request length to server this is first part of hand shake which server completes with OK
      var len = reqString.length.toString();
      client.write(len);
    }