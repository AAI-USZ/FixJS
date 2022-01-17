function loadModuleTemplates(module, moduleTemplatePath) {

  var templates = {};

  // Default the template to any loaded in the theme (overrides)
  var fs = calipso.lib.fs;

  if (!(fs.existsSync || calipso.lib.path.existsSync)(moduleTemplatePath)) {
    return null;
  }

  fs.readdirSync(moduleTemplatePath).forEach(function(name) {

    // Template paths and functions
    var templatePath = moduleTemplatePath + "/" + name;
    var templateExtension = templatePath.match(/([^\.]+)$/)[0];
    var template = fs.readFileSync(templatePath, 'utf8');
    var templateName = name.replace(/\.([^\.]+)$/, '');

    // Load the template - only if not already loaded by theme (e.g. overriden)
    var hasTemplate = calipso.utils.hasProperty('theme.cache.modules.' + module.name + '.templates.' + templateName, calipso);

    if (hasTemplate) {

      // Use the theme version
      templates[templateName] = calipso.theme.cache.modules[module.name].templates[templateName];

    } else {

      // Else load it
      if (template) {
        // calipso.theme.compileTemplate => ./Theme.js
        templates[templateName] = calipso.theme.compileTemplate(template, templatePath, templateExtension);

        // Watch / unwatch files - always unwatch (e.g. around config changes)
        if (calipso.config.get('performance:watchFiles')) {

          fs.unwatchFile(templatePath); // Always unwatch first due to recursive behaviour
          fs.watchFile(templatePath, {
            persistent: true,
            interval: 200
          }, function(curr, prev) {
            loadModuleTemplates(module, moduleTemplatePath);
            calipso.silly("Module " + module.name + " template " + name + " reloaded.");
          });

        }

      }
    }
  });

  module.templates = templates;

}