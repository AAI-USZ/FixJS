function(sha, tags, cb) {    
    if(typeof tags !== 'object' ||
       (!Array.isArray(tags.tag) &&
        !Array.isArray(tags.untag))) {
      cb(new Error('tags must be passed as { tag: [], untag: [] }'));
      return;
    }         
    var options = { host: 'post.core.teleportd.com',
                    port: 80,
                    path: '/tag/' + sha,
                    method: 'POST',
                    headers: { "content-type": 'application/json',
                               "x-teleportd-accesskey": my.access_key }
                  };
    var body = '';
    
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function() {
        try {
          var post = JSON.parse(body);
          if (post.ok)
            cb();
        }
        catch(e) {
          cb(e);
        }
      });
    });
    
    req.on('error', function(e) {
      cb(e);
    });
    
    req.write(JSON.stringify(tags));
    req.end();
  }