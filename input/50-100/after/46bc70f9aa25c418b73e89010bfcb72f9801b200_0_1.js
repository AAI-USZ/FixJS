function search (m) {
        if (!m.match_data[1]) return

        m.match_data[1] = m.match_data[1].replace('search', '').trim()
        var reply = m.user + ': Please see ' + SEARCH
        + encodeURIComponent(m.match_data[1])
        m.say(reply)
        return reply
      }