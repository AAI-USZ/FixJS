function (module) {

      // Target URL.
      var url = module.key

      // If the module doesn't have extension we add 'js' by default.
      if (!module.key.match(/\.[a-zA-Z]+$/)) url = module.key + ".js"

      // Log stuff
      logger.info("Net Fetch: " + url)

      // If the module is a script we add a tag for it, otherwise we evaulte
      // it as text file.
      if (url.match("\.js"))
        this.insertScriptTag(url)
      else
        this.xhr(url, this.xhrHandler(module))
    }