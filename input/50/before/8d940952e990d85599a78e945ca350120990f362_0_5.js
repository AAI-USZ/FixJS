function(d) {
    arc.source(typeof origin === "function" ? origin.apply(this, arguments) : origin);
    return clipType(d);
  }