function(require, exports, module) {
"use strict";

var XmlMode = require("./xml").Mode;
var assert = require("../test/assertions");

module.exports = {
    
    name: "XML Tokenizer",
    
    setUp : function() {
        this.tokenizer = new XmlMode().getTokenizer();
    },

    "test: tokenize1" : function() {
        var line = "<Juhu>//Juhu Kinners</Kinners>";
        var tokens = this.tokenizer.getLineTokens(line, "start").tokens;

        assert.equal(3, tokens.length);
        assert.equal("meta.tag", tokens[0].type);
        assert.equal("text", tokens[1].type);
        assert.equal("meta.tag", tokens[2].type);
    },
    
    "test: two tags in the same lines should be in separate tokens" : function() {
        var line = "<Juhu><Kinners>";
        var tokens = this.tokenizer.getLineTokens(line, "start").tokens;

        assert.equal(2, tokens.length);
        assert.equal("meta.tag", tokens[0].type);
        assert.equal("meta.tag", tokens[1].type);
        
        assert.equal("<Juhu>", tokens[0].value);
        assert.equal("<Kinners>", tokens[1].value);
    },
    
    "test: multiline attributes": function() {
        var multiLine = ['<copy set="{', '}" undo="{', '}"/>'];
        
        var state = "start";
        var multiLineTokens = multiLine.map(function(line) {
            var tokens = this.tokenizer.getLineTokens(line, state);
            state = tokens.state;
            return tokens.tokens;
        }, this);
        
        assert.equal(multiLineTokens[0].length, 5);
        assert.equal(multiLineTokens[1].length, 5);
        assert.equal(multiLineTokens[2].length, 2);
        
        assert.equal(multiLineTokens[0][4].type, "string");
        assert.equal(multiLineTokens[1][0].type, "string");
        assert.equal(multiLineTokens[1][4].type, "string");
        assert.equal(multiLineTokens[2][0].type, "string");
    }
};

}