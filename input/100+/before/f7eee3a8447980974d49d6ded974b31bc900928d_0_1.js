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

  return entry.output;
}