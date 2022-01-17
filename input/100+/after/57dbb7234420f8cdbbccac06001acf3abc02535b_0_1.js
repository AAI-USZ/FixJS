function DefaultRemote () {
  this.context = Script.createContext();
  for (var i in global) this.context[i] = global[i];
  this.context.module = module;
  this.context.require = function(id, options) {
    // Remove module from cache if reload is requested.
    if (options && options.reload)
      delete require.cache[require.resolve(id)];
    return require(id);
  }
  var self = this;
  this.context._swank = {
    output: function output (arg) {
      self.output(arg);
    },

    inspect: function inspect () {
      Array.prototype.forEach.call(arguments, function (arg) {      
        self.output(util.inspect(arg, false, 10));
        self.output('\n');
      }); 
    }
    
  };
  this.context.inspect = this.context._swank.inspect;
}