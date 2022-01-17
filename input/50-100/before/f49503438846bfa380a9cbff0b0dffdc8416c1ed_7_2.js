function Global(runtime, script) {
    script.global = this;
    script.abc = runtime.abc;
    runtime.applyTraits(this, script.traits, null, new Scope(null, this));
    script.loaded = true;
  }