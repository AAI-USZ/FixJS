function request(req, respond) {
  var client = net.connect( { path: sockfile })
    , reqString = JSON.stringify(req)
    , reqSent
    , lenSent
    , len
    , buf = ''
    ;

  client
    .on('error', function (err) {
      log.error('client', err);
      respond(err);
    })
    .on('end', function () {
      log.silly('client', 'client disconnected');

      result = JSON.parse(buf.toString());
      log.silly('client', 'request exited with code: %s', result.exitCode);

      respond(result.err, result.res);
    });


  // Protocol
  // Note that we skip the 'request received ACK' step
  client
    .on('connect', function () {
      log.silly('client', 'client connected');

      // 1. Send request length to server this is first part of hand shake which server completes with OK
      var len = reqString.length.toString();
      client.write(len);
    })
      // 2. Wait for OK from server
    .once('data', function (data) {
      
      if (data.toString() !== 'OK') {
        respond(new Error('Never got OK from server'));
        return;
      }
      
      // 3. Once server confirms that he got request length, we send request
      client.write(reqString);

      // 4. Wait for response length
      client.once('data', function (data) {
        
      // 5.Acknowledge that we got response length
        len = parseInt(data.toString(), 10);
        client.write('OK');

      // 6. Wait for response packets and buffer them until we got entire response
        client.on('data', function (data) {
          buf += data;
          if (buf.length === len) client.end(); 
        });
      });
    })
    ;
}