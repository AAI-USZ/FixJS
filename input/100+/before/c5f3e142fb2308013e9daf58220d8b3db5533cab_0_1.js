function() {
    var jadeRuntimeSource = fs.readFileSync(path.join(__dirname, "..", 'node_modules', 'jade', 'lib', 'runtime.js'));
    // yiha, code that writes code!
    buf = [];
    buf.push("window['"+jadeKey+"'] = (function() {");
    buf.push(  "var jade = { exports: {} };");
    buf.push(  "(function(module, exports) {");
    buf.push(     jadeRuntimeSource);
    buf.push(   "})(jade, jade.exports);");
    buf.push(   "return jade.exports;");
    buf.push("})();");

    bundle.prepend(buf.join("\n"));
    init = false;
  }