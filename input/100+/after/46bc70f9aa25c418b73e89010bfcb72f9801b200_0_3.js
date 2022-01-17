function router (m, cb) {
  m.match_data = m.text[0].match(/(?:npm(?:bro)?) (((?:[a-z0-9_ -]*)))/)
  if (!m.match_data) {
    var reply = 'npmbro usage: '
      + '`npm <command> <arguments ...>`'
      + ' For more information on npmbro, see'
      + ' https://github.com/DTrejo/npmbro or run'
      + ' `npm docs npmbro` or run `npm credits`.     '
      + ' Available commands: '
      + Object.keys(routes).map(function(r) {
          return 'npm ' + r
        }).join(' | ')
    m.say(reply)
    return cb()
  }
  var cmd = ((m.match_data[1] || '').split(' ') || [])[0]
  var route = routes[cmd]
  if (route) return route(m, cb)
  else return routes.help(m, cb)
}