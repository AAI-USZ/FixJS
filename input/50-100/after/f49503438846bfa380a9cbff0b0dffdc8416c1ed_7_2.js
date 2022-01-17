function Global(runtime, script) {
    script.global = this;
    script.abc = runtime.abc;
    runtime.applyTraits(this, new Scope(null, this), null, script.traits, null, false);
    script.loaded = true;
  }