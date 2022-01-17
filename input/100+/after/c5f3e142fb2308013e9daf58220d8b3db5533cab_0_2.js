function (b, filename) {
    var body = fs.readFileSync(filename);
    if (init) init();
    var compiled;
    try {
      compiled = jade.compile(body, {filename: filename, client: true, compileDebug: true}).toString();
    }
    catch (e) {
      // There's a syntax error in the template. Wrap it into a function that will throw an error when templates is used
      compiled = "function() {throw new Error(unescape('"+escape(e.toString()+"\nIn "+filename)+"'))}"
    }
    // Scope jade into the compiled render function by grabbing it from the window object again
    return "var jade = window['"+jadeKey+"'];module.exports="+compiled;
  }