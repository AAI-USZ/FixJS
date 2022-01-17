function() {
  var e, eclass;

  eclass = require('./lib/engine').engine;

  e = new eclass({
    maxCacheAge: Infinity
  });

  exports.expressEngine = e;

  exports.render = e.run;

  exports.__express = e.run;

  exports.compile = require('./lib/view').expressCompile;

}