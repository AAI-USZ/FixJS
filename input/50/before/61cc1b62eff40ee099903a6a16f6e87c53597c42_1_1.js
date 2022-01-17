function(code) {
    var out = "require.define('" + this.moduleName() + "', function(require, module, exports) {\n(function() {\nrequire=hackRequire(require);\n" + code + "\n}).call(module.exports)});\n";
    return out;
  }