function(err, checkRes, body) {
    if (err || checkRes.statusCode != 200) {
      util.log(err || 'Monitor HTTP code:', checkRes.statusCode)
      return done()
    }
    var sites = JSON.parse(body)
    sites.sort(function(a, b) {
      return a.name.localeCompare(b.name)
    })
    var columns = [[], [], [], []]
    var ok = true
    for (var i=0; i<sites.length; i++) {
      columns[Math.floor(i * columns.length / sites.length)].push(sites[i])
      if (!sites[i].ok) ok = false
    }
    context.columns = columns
    context.ok = ok
    done()
  }