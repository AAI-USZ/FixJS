function(code) {
    var out = "require.define('" + this.moduleName() + "', function(require, module, exports) {\nrequire=hackRequire(require);\n" + code + "\n});\n";
    return out;
  }