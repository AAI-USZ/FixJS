function search (m) {
        m.match_data[1] = m.match_data[1].replace('search', '')
        var reply = m.user + ': Please see ' + SEARCH
        + encodeURIComponent(m.match_data[1]) + ' .'
        m.say(reply)
        return reply
      }