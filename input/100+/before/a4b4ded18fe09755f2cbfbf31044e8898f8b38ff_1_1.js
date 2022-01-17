function(fileString, filename) {
    var loc = window.location.pathname;
    var dir = loc.substring(loc.lastIndexOf('/'));

    this.filename = filename;
    this.globals = new Globals({ directory: dir });
    this.engine = new ScriptEngine(fileString, this.globals.getFunctionSymbols());
    this.translator = new Translator(this.engine.blocks, filename);
}