function getOAuthHash(err, data){
        if (err) throw err;
        passed_tokens = data;
        that.getOAuthHash(passed_tokens.oauth_token, this);
      }