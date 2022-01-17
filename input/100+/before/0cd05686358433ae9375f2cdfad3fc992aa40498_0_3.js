function() {
    var client, options, weibo_cookie;
    weibo_cookie = '';
    if (token_expire_time < TOKEN_EXPIRE_THRESHOLD) {
      get_weibo_cookie(weibo_cookie);
      console.log("the weibo cookie is " + weibo_cookie);
      options = {
        host: token_gate_host,
        path: "?app_key=" + app_key + "&_t=0",
        method: "GET",
        headers: {
          Cookie: weibo_cookie,
          Referer: "http://open.weibo.com/tools/console"
        }
      };
      return client = http.request(options, function(res) {
        var raw;
        res.setEncoding('utf8');
        raw = "";
        res.on('data', function(chunk) {
          return raw += chunk;
        });
        return res.on('end', function() {
          var data;
          data = JSON.parse(raw);
          if (data.token != null) {
            access_token = data.token;
            console.log("token refreshed..");
          }
          if (data.expires_in != null) {
            return token_expire_time = data.expires_in;
          }
        });
      });
    }
  }