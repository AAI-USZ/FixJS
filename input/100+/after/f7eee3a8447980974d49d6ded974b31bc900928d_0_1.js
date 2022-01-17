function resolveInManifest(route){
  var asset = assets.parse(route, context, servePath);
  if(asset.isAbsolute) {
    return asset.toHTML();
  }
      
  entry = manifest[asset.requested];

  if(!entry) {
    console.error("Cannot resolve '" + asset.requested + "' in production manifest file.");
    return '';
  }
  
  var path = entry.output;
  
  if(typeof route !== 'string') { //account for css routes coming in as objects that define different media types (e.g. print, screen, etc)
    for(var key in route) {
      var mediaType = key;
      if(mediaType.toLowerCase() != 'screen') {
        path = path.replace("media='screen'", "media='" + key + "'");
      }
    }
  }

  return path;
}