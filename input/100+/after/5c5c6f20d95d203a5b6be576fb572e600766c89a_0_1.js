function issued(err, accessToken, params) {
      if (err) { return next(err); }
      if (!accessToken) { return next(new AuthorizationError('authorization server denied request', 'access_denied')); }
      
      var tok = {};
      tok['access_token'] = accessToken;
      if (params) { utils.merge(tok, params); }
      tok['token_type'] = tok['token_type'] || 'bearer';
      if (txn.req && txn.req.state) { tok['state'] = txn.req.state; }
      
      var parsed = url.parse(txn.redirectURI);
      parsed.hash = qs.stringify(tok);
      
      var location = url.format(parsed);
      return res.redirect(location);
    }