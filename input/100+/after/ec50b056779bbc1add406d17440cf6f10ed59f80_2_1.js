function loadBlacklist() {
  if (!this.context.config.words) { this.context.config.words = []; };
  var config = this.context.config;
  this.context.blacklist = {
    add: function (w) { config.words.push(w); },
    has: function (w) { return config.words.indexOf(w) !== -1; },
    del: function (w) { config.words.splice(config.words.indexOf(w), 1); },
    get: function ( ) { return config.words; }
  };
}