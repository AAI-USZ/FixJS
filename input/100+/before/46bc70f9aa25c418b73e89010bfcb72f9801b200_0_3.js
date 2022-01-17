function router (m, npm, cb) {
  m.match_data = m.source.match(/(?:npm(?:bro)?) (((?:[a-z0-9_ -]*)))/)
  var cmd = ((m.match_data[1] || '').split(' ') || [])[0]
  var route = routes[cmd]
  if (route) return route(m, npm, cb)
  else return routes.help(m, npm, cb)
}