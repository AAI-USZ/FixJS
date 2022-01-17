function() {
  // Hook the jade runtime object to a random key in the window object
  var jadeKey = "__jade__"+Math.random().toString(16).substring(2);
  var init = function() {
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
  };
  return function (b, filename) {
    var body = fs.readFileSync(filename)
    if (init) init();
    var compiled = jade.compile(body, {filename: filename, client: true, compileDebug: false}).toString();
    // Scope jade into the compiled render function by grabbing it from the window object again
    return "var jade = window['"+jadeKey+"'];module.exports="+compiled;
  }
}