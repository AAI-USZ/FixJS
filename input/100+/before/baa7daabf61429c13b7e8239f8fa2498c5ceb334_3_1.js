function (opts) {
    opts = opts || {};
    var actorCSS = [];
    var animName = opts.name || this.getCSSName();
    var granularity = opts.granularity || DEFAULT_GRANULARITY;
    var actorClass = generateCSSClass(this, animName, opts.vendors);
    actorCSS.push(actorClass);

    var optimizedEasingFormula = getOptimizedEasingFormula(this);
    var keyframes;

    // TODO: CSS optimization is _extremely_ incomplete.  It only supports
    // single-step animations with one keyframe property.
    if (typeof optimizedEasingFormula === 'string') {
      keyframes = generateOptimizedKeyframes(this, optimizedEasingFormula);
    } else {
      keyframes = generateActorKeyframes(this, granularity);
    }

    var boilerplatedKeyframes = applyVendorBoilerplates(
        keyframes, animName, opts.vendors);
    actorCSS.push(boilerplatedKeyframes);

    return actorCSS.join('\n');
  }