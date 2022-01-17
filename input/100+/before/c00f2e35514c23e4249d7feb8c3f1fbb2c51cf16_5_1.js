function() {
        // Any non-oauth request will continue down the default middlewares
        if (req.url.split('/')[1] !== '_oauth')
          next();

        if (!Meteor.accounts.facebook._appId || !Meteor.accounts.facebook._appUrl)
          throw new Error("Need to call Meteor.accounts.facebook.setup first");
        if (!Meteor.accounts.facebook._secret)
          throw new Error("Need to call Meteor.accounts.facebook.setSecret first");

        // Close the popup window
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var content =
              '<html><head><script>window.close()</script></head></html>';
        res.end(content, 'utf-8');

        // Try to unblock the appropriate call to `login`
        var future = oauthFutures[req.query.state];
        if (future) {
          // Unblock the `login` call
          future.return(handleOauthRequest(req));
        } else {
          // Store this request. We expect to soon get a call to `login`
          unmatchedOauthRequests[req.query.state] = req;
        }
      }