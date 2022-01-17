function(require) {

var Globals = require('./Globals');
var ScriptEngine = require('./ScriptEngine');
var Translator = require('./Translator');

var Danmakufu = function(fileString, filename) {
    var loc = window.location.pathname;
    var dir = loc.substring(loc.lastIndexOf('/'));

    this.filename = filename;
    this.globals = new Globals({ directory: dir });
    this.engine = new ScriptEngine(fileString, this.globals.getFunctionSymbols());
    this.translator = new Translator(this.engine.blocks, filename);
};

Danmakufu.prototype = {
    execute: function(onload) {
        var head = document.getElementsByTagName('head')[0],
        script = document.createElement('script');
        script.textContent = this.translator.result;
        head.appendChild(script);
        require([ 'danmakufu/' + this.filename ], function(module) {
            onload(module);
        });
    }
};

Danmakufu.loadFile = function(path) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', path, false);
    xmlHttp.send(null);
    if (xmlHttp.status === 200 || xmlHttp.status === 0) {
        var dotIndex = path.lastIndexOf('.');
        if (dotIndex === -1) {
            dotIndex = path.length;
        }
        return new Danmakufu(xmlHttp.responseText, path.substr(0, dotIndex));
    }
    return null;
};

return Danmakufu;

}