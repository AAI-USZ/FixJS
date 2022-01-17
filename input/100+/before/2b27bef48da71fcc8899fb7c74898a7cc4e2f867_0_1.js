function (req, res, next) {
    // req.url will be "/_oauth/<service name>?<action>"
    var barePath = req.url.substring(0, req.url.indexOf('?'));
    var splitPath = barePath.split('/');

    // Any non-oauth request will continue down the default middlewares
    if (splitPath[1] !== '_oauth') {
      next();
      return;
    }

    // Make sure we prepare the login results before returning.
    // This way the subsequent call to the `login` method will be
    // immediate.

    var serviceName = splitPath[2];
    var service = Meteor.accounts.oauth2._services[serviceName];

    // Get or create user id
    var userInfo = service.handleOauthRequest(req.query);

    var userId = Meteor.accounts.updateOrCreateUser(
      userInfo.email, userInfo.userData, serviceName,
      userInfo.serviceUserId, userInfo.serviceData);

    // Generate and store a login token for reconnect
    // XXX this could go in accounts_server.js instead
    var loginToken = Meteor.accounts._loginTokens.insert({userId: userId});

    // Store results to subsequent call to `login`
    Meteor.accounts.oauth2._loginResultForState[req.query.state] =
      {token: loginToken, id: userId};

    // We support ?close and ?redirect=URL. Any other query should
    // just serve a blank page
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
      res.end('', 'utf-8');
    }
  }