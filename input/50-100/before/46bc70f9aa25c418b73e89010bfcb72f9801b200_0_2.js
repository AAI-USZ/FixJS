function help (m) {
        m.match_data[1] = m.match_data[1].replace('help', '')
        var reply = m.user + ': Please see https://duckduckgo.com/?q='
          + encodeURIComponent('site:http://npmjs.org/doc/ ' + m.match_data[1])
        m.say(reply)
        return reply
      }