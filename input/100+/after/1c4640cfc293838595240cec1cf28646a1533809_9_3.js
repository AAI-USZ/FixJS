function(exists) {

    if (exists) {

      var templateData = '';

      try {
        templateData = fs.readFileSync(templatePath, 'utf8');
      } catch (err) {
        calipso.error('Failed to open template ' + templatePath + ' ...');
      }

      if (calipso.config.get('performance:watchFiles')) {

        try {
          fs.unwatchFile(templatePath);
          fs.watchFile(templatePath, {
            persistent: true,
            interval: 200
          }, function(curr, prev) {
            loadTemplate(templateCache, template, themePath, function() {
              calipso.silly("Template " + templatePath + " reloaded ...");
            });
          });
        } catch (ex) {
          calipso.error('Failed to watch template ' + templatePath + ' ...');
        }

      }

      // Precompile the view into our cache
      templateCache[template.name].template = compileTemplate(templateData, templatePath, templateExtension);

      // See if we have a template fn
      if ((fs.existsSync || path.existsSync)(templateFnPath)) {

        if (exists) {
          try {
            templateCache[template.name].fn = require(templateFnPath);
          } catch (ex) {
            calipso.error(ex);
          }

        }

      }

      return next(null, template);

    } else {

      next(new Error('Path does not exist: ' + templatePath));

    }

  }