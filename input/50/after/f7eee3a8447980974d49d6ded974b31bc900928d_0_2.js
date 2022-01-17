function parseAssets(diskPath) {
          // TODO: Remove the readFileSync bottleneck in here
          var asset = assets.parseDiskPath(diskPath, context, paths, servePath);
          if(asset != null)
            asset.calculateFingerprint();
          return asset;
        }