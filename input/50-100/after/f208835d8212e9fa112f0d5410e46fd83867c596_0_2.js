function getName(origin) {
    var manifest = getManifest(origin);
    if (!manifest) {
      return null;
    }

    if ('locales' in manifest) {
      var locale = manifest.locales[navigator.language];
      if (locale && locale.name) {
        return locale.name;
      }
    }

    return manifest.name;
  }