function docs (m, cb) {
        cb = cb || noop
        if (!m.match_data[1]) return cb()

        var names =
          m.match_data[1].replace('docs', '')
          .split(' ')
          .filter(identity)

        if (!names.length) {
          var reply = m.user + ': Usage is: npm docs <packagename>'
          m.say(reply)
          return cb(null, reply)
        }

        return async.map(names, function(name, callback) {
          return docsUrl([ name ], callback)
        }, onUrls)
        function onUrls(err, urls) {
          urls = urls
            .filter(identity)
            .filter(isUrl)

          if (!urls.length) {
            var reply = m.user + ': No results';
            m.say(reply)
            return cb(err, reply)
          }
          var reply = m.user + ': Please see ' + urls.join(' ')
          m.say(reply)
          return cb(err, reply)
        }
      }