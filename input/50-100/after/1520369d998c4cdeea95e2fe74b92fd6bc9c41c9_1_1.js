function() {
    var superclass = Class.superclass;
    if (superclass) { superclass.proto(); }

    if (!wasApplied) {
      wasApplied = true;
      Class.PrototypeMixin.applyPartial(Class.prototype);
      hasChains = !!meta(Class.prototype, false).chains; // avoid rewatch
    }

    return this.prototype;
  }