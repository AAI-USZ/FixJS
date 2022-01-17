function generateModule (opt) {
    opt = typal.mix.call({}, this.options, opt);
    var moduleName = opt.moduleName || "parser";
    var out = "/* Jison generated parser */\n";
    out += (moduleName.match(/\./) ? moduleName : "var "+moduleName)+" = (function(){";
    out += "\nvar parser = "+this.generateModule_();
    out += "\n"+this.moduleInclude;
    if (this.lexer && this.lexer.generateModule) {
        out += this.lexer.generateModule();
        out += "\nparser.lexer = lexer;";
    }
    out += "\nreturn parser;\n})();";

    return out;
}