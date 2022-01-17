function help (m) {
        if (!m.match_data[1]) return

        m.match_data[1] = m.match_data[1].replace(/help search|help/, '').trim()
        var reply = m.user + ': Please see npm\'s documentation at'
          + ' https://duckduckgo.com/?q='
          + encodeURIComponent('site:http://npmjs.org/doc/ ' + m.match_data[1])
        m.say(reply)
        return reply
      }