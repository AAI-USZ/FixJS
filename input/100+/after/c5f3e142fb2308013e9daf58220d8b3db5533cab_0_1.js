function() {
    var jadeRuntimeSource = fs.readFileSync(path.join(__dirname, "..", 'node_modules', 'jade', 'lib', 'runtime.js'));
    // yiha, code that writes code!
    buf = [];
    buf.push("window['"+jadeKey+"'] = (function() {");
    buf.push(  "var jade = { exports: {} };");
    buf.push(  "(function(module, exports) {");
    buf.push(     jadeRuntimeSource);
    buf.push(   "})(jade, jade.exports);");
    // Overwrite jade's rethrow because it uses the node.js fs module and thus will fail in browser context
    // Waiting for this https://github.com/visionmedia/jade/pull/543
    // Todo: could also consider including a sourcemapping here in debug mode
    buf.push(   "jade.exports.rethrow = function(err, filename, lineno) {");
    buf.push(     'throw new Error(err.toString()+"\\n  In "+filename+":"+lineno)');
    buf.push(   "};");
    buf.push(   "return jade.exports;");
    buf.push("})();");

    bundle.prepend(buf.join("\n"));
    init = false;
  }