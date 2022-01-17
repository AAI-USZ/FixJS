function issued(err, code) {
      if (err) { return next(err); }
      if (!code) { return next(new AuthorizationError('authorization server denied request', 'access_denied')); }
      
      var parsed = url.parse(txn.redirectURI, true);
      delete parsed.search;
      parsed.query['code'] = code;
      if (txn.req && txn.req.state) { parsed.query['state'] = txn.req.state; }
      
      var location = url.format(parsed);
      return res.redirect(location);
    }