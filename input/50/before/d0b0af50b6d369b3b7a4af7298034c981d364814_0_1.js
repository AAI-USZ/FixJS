function(d) {
    if (typeof origin === "function") arc.source(origin.apply(this, arguments));
    return clipType(d);
  }