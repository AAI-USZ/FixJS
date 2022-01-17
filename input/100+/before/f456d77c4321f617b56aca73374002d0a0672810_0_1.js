function(path) {
      var root = path[0] + '/'
      var parts = path[1]
      var comboPath = root + comboSyntax[0] + parts.join(comboSyntax[1])
      var hash = {}

      util.forEach(parts, function(part) {
        hash[root + part] = comboPath
      })

      map.push(function(url) {
        return hash[url] || url
      })
    }