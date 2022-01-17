function parseDiskPath(diskPath, context, paths, servePath) {
  var asset = null;
  
  try {
    for(var i=0; i<paths.length; ++i) {
      var aPath = paths[i];
      if(diskPath.indexOf(aPath) === 0) {
        var route = diskPath.replace(aPath + '/', '');
        route = route.substr(route.indexOf('/') + 1);
        asset = exports.parse(route, context, servePath);
        break;
      }
    }
  } catch (e) {
    console.log("Ignoring asset: " + e);
    asset = null;
  }
  
  return asset;
}