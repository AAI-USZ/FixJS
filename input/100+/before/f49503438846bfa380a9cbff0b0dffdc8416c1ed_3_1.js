function Domain(base, mode, allowNatives) {
    // ABCs that belong to this domain.
    this.abcs = [];

    // Classes that have been loaded.
    this.loadedClasses = [];

    // Classes cache.
    this.cache = {};

    // Our parent.
    this.base = base;

    // Do we allow natives?
    this.allowNatives = allowNatives;

    // Do we compile or interpret?
    this.mode = mode;
  }