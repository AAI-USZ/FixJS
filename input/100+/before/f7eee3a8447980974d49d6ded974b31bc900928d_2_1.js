function getContentMeta(pathPart, name, ext, type, locale) {
  var checkPath = path.join(type, pathPart, name + "." + ext),
      indexPath = path.join(type, pathPart, name, "index." + ext),
      assemblyPath = path.join(type, pathPart, name, "assembly.json");
  
  //return from cache if found
  var localeCache = contentMetaCache[locale];
  if(!localeCache) {
    localeCache = contentMetaCache[locale] = {};
  } else {
    if(localeCache[checkPath]){
      return localeCache[checkPath];
    }
  }

  //try and resolve in searchPaths
  var meta = {
    assembled: false,
    mainFile: null,
    name: name,
    pathPart: pathPart
  };
  
  for(var i=0; i<searchPaths.length; ++i){
    var fullPath = path.resolve(searchPaths[i], checkPath);
    //look for exact path match
    if(path.existsSync(fullPath)) {
      meta.mainFile = fullPath;
      break;
    }
    //look for a folder with an index file in it
    fullPath = path.resolve(searchPaths[i], indexPath);
    //look for exact path match
    if(path.existsSync(fullPath)) {
      meta.mainFile = fullPath;
      break;
    }
    
    //look for a folder with an assemblies.json file in it
    fullPath = path.resolve(searchPaths[i], assemblyPath);
    //look for exact path match
    if(path.existsSync(fullPath)) {
      meta.mainFile = fullPath;
      meta.assembled = true;
      meta.baseModulePath = path.join(searchPaths[i], type, pathPart, name);
      meta.basePath = searchPaths[i];
      meta.locale = locale;
      break;
    }
  }

  if(meta.mainFile === null) {
    console.log("Unable to find asset: " + checkPath);
  } else {
    localeCache[checkPath] = meta;
  }
  return meta;
}