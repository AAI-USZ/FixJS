function(type) {
  this.type = type;
  this.id = builder.__idCounter;
  this.negated = false;
  builder.__idCounter++;
  var pNames = this.type.getParamNames();
  if (pNames) {
    for (var i = 0; i < pNames.length; i++) {
      if (i + 1 < arguments.length) {
        this[pNames[i]] = arguments[i + 1];
      } else {
        this[pNames[i]] = this.type.getParamType(pNames[i]) == "locator" ? builder.locator.empty() : "";
      }
    }
  }
  this.changeType(this.type);
}