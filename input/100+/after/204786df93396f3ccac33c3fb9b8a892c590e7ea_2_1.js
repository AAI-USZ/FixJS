function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');
  //req.use('security.isAdmin');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {
    sendMessage: function(message) {
      // set user id here
      req.session.setUserId('foobar');

      console.log('rpc.sendMessage session =>\n ', req.session);

      if (message && message.length > 0) {         // Check for blank messages
        ss.publish.all('newMessage', message);     // Broadcast the message to everyone
        console.log('respond true');
        return res(true);                          // Confirm it was sent to the originating client
      } else {
        console.log('respond false');
        return res(false);
      }
    }

  };

}