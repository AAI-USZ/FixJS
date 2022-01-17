function() {
    if (defaults) { Ember.setProperties(this, defaults); defaults = null; }

    if (!wasApplied) { Class.proto(); } // prepare prototype...
    if (initMixins) {
      this.reopen.apply(this, initMixins);
      initMixins = null;
      rewatch(this); // always rewatch just in case
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
  }