function(newType) {
    this.type = newType;
    var pNames = this.type.getParamNames();
    for (var i = 0; i < pNames.length; i++) {
      if (!this[pNames[i]]) {
        this[pNames[i]] = this.type.getParamType(pNames[i]) == "locator" ? builder.locator.empty() : "";
      }
    }
  }