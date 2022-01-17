function makeCtor() {

  // Note: avoid accessing any properties on the object since it makes the
  // method a lot faster.  This is glue code so we want it to be as fast as
  // possible.

  var isPrepared = false, initMixins, init = false, hasChains = false;

  var Class = function() {
    if (!isPrepared) { get(Class, 'proto'); } // prepare prototype...
    if (initMixins) {
      this.reopen.apply(this, initMixins);
      initMixins = null;
      rewatch(this); // ålways rewatch just in case
      this.init.apply(this, arguments);
    } else {
      if (hasChains) {
        rewatch(this);
      } else {
        Ember.GUID_DESC.value = undefined;
        o_defineProperty(this, Ember.GUID_KEY, Ember.GUID_DESC);
      }
      if (init===false) { init = this.init; } // cache for later instantiations
      Ember.GUID_DESC.value = undefined;
      o_defineProperty(this, '_super', Ember.GUID_DESC);
      init.apply(this, arguments);
    }
  };

  Class.toString = classToString;
  Class._prototypeMixinDidChange = function() {
    ember_assert("Reopening already instantiated classes is not supported. We plan to support this in the future.", isPrepared === false);
    isPrepared = false;
  };
  Class._initMixins = function(args) { initMixins = args; };

  Ember.defineProperty(Class, 'proto', Ember.computed(function() {
    if (!isPrepared) {
      isPrepared = true;
      Class.PrototypeMixin.applyPartial(Class.prototype);
      hasChains = !!meta(Class.prototype, false).chains; // avoid rewatch
    }
    return this.prototype;
  }));

  return Class;

}