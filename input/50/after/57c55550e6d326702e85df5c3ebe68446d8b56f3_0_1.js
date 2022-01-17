function Change__string(str) {
    try {
      return this._stringBundle.GetStringFromName(str);
    } catch (e) {
      Components.utils.reportError("Missing string: " + str);
      throw e;
    }
  }