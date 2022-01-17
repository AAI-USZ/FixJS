function regenerateSignature(err, data){
        if (err) throw err;
        if (!this.is_oauth_request) return null;

        ohash = data;
        var consumer     = OAuthUtil.createConsumer(ohash.consumer_key, ohash.consumer_secret);
        var access_token = OAuthUtil.createToken(ohash.access_token_token, ohash.access_token_secret);
        var signer       = OAuthUtil.createHmac(consumer, access_token);

        var method = req.method;
        var host   = req.headers.host;
        var path   = http ? 'http://' + host + req.route.path : 'https://' + host + req.route.path;
        that.splitParams(req.query);

        // remove signature from passed_tokens
        signature = passed_tokens.oauth_signature;
        delete passed_tokens['oauth_signature'];

        var base64;
        var joined = {};

        // remove oauth_signature from body
        if(req.body) {
            delete req.body['oauth_signature'];
        }
        _.extend(joined, req.body ? req.body : null);
        _.extend(joined, passed_tokens);
        _.extend(joined, req.query);

        return signer.sign(method, path, joined);
      }