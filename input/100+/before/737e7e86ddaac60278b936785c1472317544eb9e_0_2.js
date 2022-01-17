f"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var LuaHighlightRules = require("./lua_highlight_rules").LuaHighlightRules;

var Mode = function() {
    this.$tokenizer = new Tokenizer(new LuaHighlightRules().getRules());
};
oop.inherits(Mode, TextMode);

(function() {
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.$tokenizer.getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
    
        var chunks = ["function", "then", "do", "repeat"];
        
        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            } else {
                for (var i in tokens){
                    var token = tokens[i];
                    if (token.type != "keyword") continue;
                    var chunk_i = chunks.indexOf(token.value);
                    if (chunk_i != -1){
                        indent += tab;
                        break;
                    }
                }
            }
        } 

        return indent;
    };
    
}).call(Mode.prototype);

exports.Mode = Mode;
});
