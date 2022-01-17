function getOAuthHash(err, data){
        if (err) throw err;

        // this is oauth request only if oauth headers are present
        this.is_oauth_request = !_.isEmpty(data);

        if (this.is_oauth_request) {
          passed_tokens = data;
          that.getOAuthHash(passed_tokens.oauth_token, this);
        } else {
          return null;
        }
      }