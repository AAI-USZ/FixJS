function(fileString, filename, functions) {
    var newFunctions = {};
    var loc = window.location.pathname;
    var dir = loc.substring(loc.lastIndexOf('/'));

    this.filename = filename;
    this.globals = new Globals({ directory: dir });
    functions = extend([ this.globals.functions, functions ]);
    this.engine = new ScriptEngine(fileString, this.globals.toSymbols(functions));
    this.translator = new Translator(this.engine.blocks, filename, this.engine.parser.comments);
}