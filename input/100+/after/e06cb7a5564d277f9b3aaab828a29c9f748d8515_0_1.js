function request(req, respond) {
  var reqString = JSON.stringify(req)
    , len
    , buf = ''
    , states = [ 'WaitOK', 'WaitLen', 'Recv' ]
    , state
    ;

  var client = net.connect( { path: sockfile });

  client
    .on('error', function (err) {
      log.error('client', err);
      respond(err);
    })
    .once('end', function () {
      log.silly('client', 'client disconnected');

      if (buf.length > 0) {
        result = JSON.parse(buf.toString());
        log.silly('client', 'request exited with code: %s', result.exitCode);
        log.silly('client', result);
        respond(result.err, result.res);
      }
    })
    .on('connect', function () {
      log.silly('client', 'client connected');

      // Send request length to server this is first part of hand shake which server completes with OK
      var len = reqString.length.toString();
      client.write(len);
      state = 0;
    })
    .on('data', function (data) {

      log.silly('client', data.toString());
      if(states[state] === 'WaitOK') {
        if (data.toString() !== 'OK') {
          respond(new Error('Never got OK from server'));
          return;
        }
        state++;
        
        // Once server confirms that he got request length, we send request
        client.write(reqString);
      } else if (states[state] === 'WaitLen') {
        // Acknowledge that we got response length
        len = parseInt(data.toString(), 10);
        client.write('OK');
        state++;
      } else if (states[state] === 'Recv') {
        // Buffer response packets until we got entire response
        buf += data;

        log.silly('client', 'Got %d/%d', buf.length, len);

        if (buf.length === len) client.end();
      }
    })
    ;
}