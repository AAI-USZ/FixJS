function (opts) {
    opts = opts || {};
    var actorCSS = [];
    var animName = opts.name || this.getCSSName();
    var granularity = opts.granularity || DEFAULT_GRANULARITY;
    var actorClass = generateCSSClass(this, animName, opts.vendors);
    var boilerplatedKeyframes = generateBoilerplatedKeyframes(
        this, animName, granularity, opts.vendors);

    actorCSS.push(actorClass);
    actorCSS.push(boilerplatedKeyframes);

    return actorCSS.join('\n');
  }