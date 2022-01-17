function highlight(code, language, options) {
  var mergedOpts = { }
    , defaults = {
      toolbar: false
    };

  if (options) {
    // Gather all user specified options first
    Object.keys(options).forEach(function (key) {
      mergedOpts[key] = options[key];
    });
    // Add default option only if user didn't specify its value
    Object.keys(defaults).forEach(function (key) {
      mergedOpts[key] = options[key] || defaults[key];
    });

  } else {
    mergedOpts = defaults;
  }

  var brush = new language.Brush();

  brush.init(mergedOpts);

  return brush.getHtml(code);
}