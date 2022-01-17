function generateCommonJSModule (opt) {
    opt = typal.mix.call({}, this.options, opt);
    var moduleName = opt.moduleName || "parser";
    var out = this.generateModule(opt)
        + "\nif (typeof require !== 'undefined' && typeof exports !== 'undefined') {"
        + "\nexports.parser = "+moduleName+";"
        + "\nexports.Parser = "+moduleName+".Parser;"
        + "\nexports.parse = function () { return "+moduleName+".parse.apply("+moduleName+", arguments); }"
        + "\nexports.main = "+ String(opt.moduleMain || commonjsMain)
        + "\nif (typeof module !== 'undefined' && require.main === module) {\n"
        + "  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require(\"system\").args);\n}"
        + "\n}"

    return out;
}