function processAsset(asset, callback){
          var manifestEntry = asset.getServerManifestEntry(),
              clientManifestEntry = asset.getClientManifestEntry();
  
          manifest[manifestEntry.requested] = manifestEntry;
          clientManifest[asset.type][clientManifestEntry.name] = clientManifestEntry.path;
          
          asset.writeContents(builtAssets, callback);
        }