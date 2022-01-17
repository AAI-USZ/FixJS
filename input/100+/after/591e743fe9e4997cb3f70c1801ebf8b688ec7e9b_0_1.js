function(template, data, mode) {
  // Set delimiters, and get a opening match character.
  var opener = grunt.template.delimiters(mode);
  // Clone data, initializing to config data or empty object if omitted.
  data = Object.create(data || grunt.config() || {});
  // Expose grunt so that grunt utilities can be accessed, but only if it
  // doesn't conflict with an existing .grunt property.
  if (!('grunt' in data)) { data.grunt = grunt; }
  // Keep track of last change.
  var last = template;
  try {
    // As long as template contains template tags, render it and get the result,
    // otherwise just use the template string.
    while (template.indexOf(opener) >= 0) {
      template = grunt.utils._.template(template)(data);
      // Abort if template didn't change - nothing left to process!
      if (template === last) { break; }
      last = template;
    }
  } catch (e) {
    // In upgrading to Underscore.js 1.3.3, \n and \r in templates tags now
    // causes an exception to be thrown. Warn the user why this is happening.
    // https://github.com/documentcloud/underscore/issues/553
    if (String(e) === 'SyntaxError: Unexpected token ILLEGAL' && /\n|\r/.test(template)) {
      grunt.log.errorlns('A special character was detected in this template. ' +
        'Inside template tags, the \\n and \\r special characters must be ' +
        'escaped as \\\\n and \\\\r. (grunt 0.4.0+)');
    }
    grunt.warn('An error occurred while processing a template (' + e.message + ').');
  }
  // Normalize linefeeds and return.
  return grunt.utils.normalizelf(template);
}