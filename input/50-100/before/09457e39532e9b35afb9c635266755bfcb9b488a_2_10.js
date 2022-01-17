function(options, spec) {
    var spec = CodeMirror.resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) {
      if (window.console) console.warn("No mode " + spec.name + " found, falling back to plain text.");
      return CodeMirror.getMode(options, "text/plain");
    }
    return mfactory(options, spec);
  }