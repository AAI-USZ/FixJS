function node (m) {
      var reply = m.user + ': Please ctrl-f or cmd-f through the node docs at'
        + ' http://nodejs.org/docs/latest/api/all.html'
      m.say(reply)
      return reply
    }