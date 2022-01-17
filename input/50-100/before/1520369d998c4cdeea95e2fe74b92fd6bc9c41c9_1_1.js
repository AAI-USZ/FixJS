function() {
    if (!isPrepared) {
      isPrepared = true;
      Class.PrototypeMixin.applyPartial(Class.prototype);
      hasChains = !!meta(Class.prototype, false).chains; // avoid rewatch
    }
    return this.prototype;
  }