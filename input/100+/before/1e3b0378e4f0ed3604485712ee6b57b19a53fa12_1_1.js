function getTemplate(templateName, options, callback) {
      // is the template already cached?
      if (templateCache[templateName]) return callback(null, templateCache[templateName])

      // check if it has a suffix already applied
      var matches = templateName.match(/(\.[\w]+)$/)
      var suffix
      if (!matches) {
        suffix = '.html'
        templateName += '.html'
      } else {
        suffix = matches[0]
      }

      // is there an engine for the provided suffix?
      var engine = templateEngines[suffix]
      if (!engine) return callback(Error("No engine found for template type " + suffix))

      // does the template exist?
      if (!path.existsSync(templateName)) return callback(new Error("Template '" + templateName + "' does not exist"))

      // read the template in, cache, and call the callback
      fs.readFile(templateName, 'utf8', function (err, data) {
        if (err) return callback(err)
        try {
          templateCache[templateName] = engine.compile(data, options)
        } catch (e) {
          return callback(e)
        }
        return callback(null, templateCache[templateName])
      })
    }