function issued(err, code) {
      if (err) { return next(err); }
      
      var parsed = url.parse(txn.redirectURI, true);
      delete parsed.search;
      parsed.query['code'] = code;
      if (txn.req && txn.req.state) { parsed.query['state'] = txn.req.state; }
      
      var location = url.format(parsed);
      return res.redirect(location);
    }