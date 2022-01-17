function() {
        // Any non-oauth request will continue down the default middlewares
        if (req.url.split('/')[1] !== '_oauth') {
          next();
          return;
        }

        if (!Meteor.accounts.facebook._appId || !Meteor.accounts.facebook._appUrl)
          throw new Meteor.accounts.facebook.SetupError("Need to call Meteor.accounts.facebook.setup first");
        if (!Meteor.accounts.facebook._secret)
          throw new Meteor.accounts.facebook.SetupError("Need to call Meteor.accounts.facebook.setSecret first");

        Meteor.accounts._unmatchedOauthRequests[req.query.state] = req;

        // We support /_oauth?close, /_oauth?redirect=URL. Any other /_oauth request
        // just served a blank page
        if ('close' in req.query) { // check with 'in' because we don't set a value
          // Close the popup window
          res.writeHead(200, {'Content-Type': 'text/html'});
          var content =
                '<html><head><script>window.close()</script></head></html>';
          res.end(content, 'utf-8');
        } else if (req.query.redirect) {
          res.writeHead(302, {'Location': req.query.redirect});
          res.end();
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(content, 'utf-8');
        }
      }