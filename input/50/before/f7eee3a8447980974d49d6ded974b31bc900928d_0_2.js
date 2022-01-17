function parseAssets(diskPath) {
          // TODO: Remove the readFileSync bottleneck in here
          var asset = assets.parseDiskPath(diskPath, context, paths, servePath);
          asset.calculateFingerprint();
          return asset;
        }