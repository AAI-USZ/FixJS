function(newCfg, callback)
    {
      cfg = newCfg;
      if(!('publicKey' in cfg)) {
        payswarm.createKeyPair({keySize: 1024}, function(err, pair) {
          // update the configuration object with the new key info
          cfg.publicKey = {};
          cfg.publicKey.publicKeyPem = pair.publicKey;
          cfg.publicKey.privateKeyPem = pair.privateKey;
          config.writeConfigFile(cfgFile, cfg, callback);
        });
      }
      else {
        callback();
      }
    }