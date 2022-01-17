function() {
      config.debug = 0
      saveConfig(config)
      loc.replace(loc.href.replace(/(?:\?|&)seajs-debug/, ''))
    }