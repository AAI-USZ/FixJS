function() {
      config.debug = 0
      saveConfig(config)
      var query = loc.search.slice(1)
      var newQuery = query.replace(/seajs-debug&?/, '')
      loc.replace(loc.href.replace(query, newQuery))
    }