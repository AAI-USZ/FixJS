function processSection(req, res, section, sectionPath, layoutConfig, theme, next) {

  var themeOptions, sectionCache = theme.cache[sectionPath];

  // Check the theme cache
  if (!sectionCache) {
    calipso.error("Unable to find template for " + sectionPath);
    next();
    return;
  }

  var blockData = "";

  if (!sectionCache.template) {
    // Use the default
    sectionPath = "default." + section;
    sectionCache = theme.cache[sectionPath];
  }

  // should there be more than just these two error codes?
  // if more than just these two, then this would have to happen later on:
  // templates.push({name:"500", templatePath:"templates/500.html"});
  // Override with a 404 (not found) page
  if (section === "body" && res.statusCode === 404) {
    if (!theme.cache.hasOwnProperty("404")) {
      localNext(new Error("You must define a 404 template in the error folder e.g. error/404.html"));
      return;
    }
    sectionCache = theme.cache["404"];
  }

  // Override with a 500 (error) page
  if (section === "body" && res.statusCode === 500) {
    if (!theme.cache.hasOwnProperty("500")) {
      localNext(new Error("You must define a 500 template in the error folder e.g. error/500.html"));
      return;
    }
    sectionCache = theme.cache["500"];
    blockData = res.errorMessage ? res.errorMessage : "";
  }

  // Retrieve any backing function
  var sectionCacheFn = sectionCache.fn;

  // Clear any buffered output for this section
  res.bufferedOutput[section] = "";

  // Get the basic theme options
  themeOptions = createOptions(req, res, {
    blockData: blockData
  });

  // Add any custom functions
  if (typeof sectionCacheFn === "function") {

    sectionCacheFn(req, themeOptions, function(err, fnOptions) {

      if (err) {
        err.xMessage = "Issue executing the theme function for section " + section + ", check " + sectionPath.replace(".", "/") + ".js";
        localNext(err);
        return;
      }

      themeOptions = merge(themeOptions, fnOptions);
      try {
        res.bufferedOutput[section] += sectionCache.template.call({}, themeOptions);
        localNext();
      } catch (ex) {
        // Augment the exception
        ex.xMessage = "Issue processing theme section " + section + ", path: " + sectionPath;
        localNext(ex);
      }

    });

  } else {
    try {
      res.bufferedOutput[section] += sectionCache.template.call({}, themeOptions);
      localNext();
    } catch (ex) {
      ex.xMessage = "Issue processing theme section: " + section + ", theme: " + sectionPath;
      localNext(ex);
    }

  }

  // Local next function to enable proxying of callback

  function localNext(err) {
    next(err);
  }


}