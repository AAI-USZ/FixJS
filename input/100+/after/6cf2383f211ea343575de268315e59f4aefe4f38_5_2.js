function processTheme(req, res, layout, theme, next) {

  delete res.bufferedOutput;
  res.bufferedOutput = {};

  // Scan through each layout
  try {
    var layoutConfig = theme.config.layouts[layout].layout;
  } catch(ex) {
    next(ex.message);
    return;
  }

  // Check to see if this layout copies default
  if(layoutConfig.copyFrom && layout != "default") {

    var copyConfig = theme.config.layouts[layoutConfig.copyFrom].layout;
    layoutConfig.sections = layoutConfig.sections || {};
    
    // Copy over any missing sections from default
    for(var copySection in copyConfig.sections) {
      
      var sectionExists = layoutConfig.sections && layoutConfig.sections[copySection];
      var disable = layoutConfig.sections && layoutConfig.sections[copySection] && layoutConfig.sections[copySection].disable;        
      if(!sectionExists && !disable) {
        layoutConfig.sections[copySection] = copyConfig.sections[copySection];
        layoutConfig.sections[copySection].layout = "default"; // Flag override as below
      }
     
    }

  }
  
  // Create a section array
  var sections = [];
  for(section in layoutConfig.sections) {
    disable = layoutConfig.sections[section].disable;   
    if(!disable) {
      sections.push(section);
    }
  }
  var totalCount = sections.length;
  var totalDone = 0;

  // Now, process all the sections
  // This is done via a localNext to give us full control
  //   and better ability to debug
  function localNext(err) {
    totalDone += 1;
        
    if(totalDone == totalCount) {
       next();
    }
    
  }

  for(section in layoutConfig.sections) {

    // Check to see if we are overriding
    var currentSection = section;
    var layoutOverride = layoutConfig.sections[section].layout;
    var sectionPath = layoutOverride ? layoutOverride + "." + section : layout + "." + section;
    var cache = layoutConfig.sections[section].cache;
    var params = layoutConfig.sections[section].varyParams;
    var cacheEnabled = calipso.config.get('performance:cache:enabled');    
    var isAdmin = req.session.user && req.session.user.isAdmin;
    
    disable = layoutConfig.sections[section].disable;        

    calipso.silly("Processing " + section + " ...");
    
    // Sections are cacheable
    if(!disable) {
      if(cache && cacheEnabled && !isAdmin) {
        var cacheKey = calipso.cache.getCacheKey('section',currentSection,params);
        sectionCache(req, res, cacheKey, section, sectionPath, layoutConfig, theme, localNext);
      } else {
        processSection(req, res, section, sectionPath, layoutConfig, theme, localNext);
      }
    }

  };


}