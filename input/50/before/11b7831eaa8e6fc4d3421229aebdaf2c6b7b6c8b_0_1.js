function detectLanguage(identifiers) {
    for (var i = 0; i < identifiers.length; i++) {
      if (identifiers[i] in EXT_MAP) {
        return EXT_MAP[identifiers[i]];
      }
    }
    return null;
  }