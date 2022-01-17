function() {
        var m, q, url, _ref;
        q = req.query.q.trim();
        m = q.match(/^(https?:\/\/)?([\w\d][\.\w\d\-]+\.(\w{2,4})(\.\w{2})?\/?\S*)$/);
        if (m && (m[1] || ((_ref = m[3]) === 'com' || _ref === 'org' || _ref === 'edu' || _ref === 'net'))) {
          url = (m[1] || 'http://') + m[2];
        } else {
          url = 'http://www.google.com.hk/search?sourceid=chrome&ie=UTF-8&' + querystring.stringify({
              q: q
          });
        }
        return res.redirect(encode.encodeUrl(url));
    }