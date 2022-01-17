function scratch(target, error) {
    var scratchVar = this.addVariable("interface");
    var scratch = proxies.makeScratchProxy(scratchVar);

    if (error) {
      ASSERT(hd.isProxy(error), "expected proxy");
    }
    else {
      var errorVar = this.addVariable("interface");
      error = proxies.makeVariableProxy(errorVar);
    }

    ASSERT(hd.isProxy(target), "expected proxy");
    var targetVar = target.unwrap();
    if (targetVar.error === undefined)
      targetVar.error = error;

    scratchVar.error = error;
    scratchVar.translateFrom = new Translation(scratch);
    scratchVar.translateTo = new Translation(target);

    hd.constraint([scratch, target, error])
      .method([target, error], scratchVar.translateFrom.fn)
      .method([scratch, error], scratchVar.translateTo.fn);

    return scratch;
  }