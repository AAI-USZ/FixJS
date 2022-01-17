function() {
          var content;
          content = JSON.parse(raw)['results'];
          if (content != null) {
            return update_accesstoken(function(err) {
              var q;
              if (!err) {
                q = async.queue(analyze, content.length);
                q.push(content);
                return q.drain = function() {
                  var data, weibo;
                  content = (function() {
                    var _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = content.length; _i < _len; _i++) {
                      weibo = content[_i];
                      if (weibo['user_followers_count'] >= FOLLOWERS_LOW_LIMIT) {
                        _results.push(weibo);
                      }
                    }
                    return _results;
                  })();
                  data = JSON.stringify({
                    'results': content
                  });
                  resp.writeHead(200, {
                    "Content-Type": "text/json"
                  });
                  resp.write(data, "utf8");
                  return resp.end();
                };
              }
            });
          }
        }