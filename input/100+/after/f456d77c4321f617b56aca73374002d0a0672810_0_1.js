function(path) {
      var root = path[0] + '/'
      var parts = path[1]

      var hash = {}
      var comboPath = root + comboSyntax[0] + parts.join(comboSyntax[1])
      
      // http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url
      if (comboPath.length > 2000) {
        throw new Error('The combo url is too long: ' + comboPath)
      }

      util.forEach(parts, function(part) {
        hash[root + part] = comboPath
      })

      map.push(function(url) {
        return hash[url] || url
      })
    }