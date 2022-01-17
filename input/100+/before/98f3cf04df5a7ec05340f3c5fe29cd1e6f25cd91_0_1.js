function(require, exports, module) {
"use strict";

var HtmlMode = require("./html").Mode;
var assert = require("../test/assertions");

module.exports = {
    setUp : function() {
        this.tokenizer = new HtmlMode().getTokenizer();
    },

    "test: tokenize embedded script" : function() {
        var line = "<script a='a'>var</script>'123'";
        var tokens = this.tokenizer.getLineTokens(line, "start").tokens;

        assert.equal(12, tokens.length);
        assert.equal("meta.tag", tokens[0].type);
        assert.equal("meta.tag.script", tokens[1].type);
        assert.equal("text", tokens[2].type);
        assert.equal("entity.other.attribute-name", tokens[3].type);
        assert.equal("keyword.operator", tokens[4].type);
        assert.equal("string", tokens[5].type);
        assert.equal("meta.tag", tokens[6].type);
        assert.equal("storage.type", tokens[7].type);
        assert.equal("meta.tag", tokens[8].type);
        assert.equal("meta.tag.script", tokens[9].type);
        assert.equal("meta.tag", tokens[10].type);
        assert.equal("text", tokens[11].type);
    },
    
    "test: tokenize multiline attribute value with double quotes": function() {
        var line1 = this.tokenizer.getLineTokens('<a href="abc', "start");
        var t1 = line1.tokens;
        var t2 = this.tokenizer.getLineTokens('def">', line1.state).tokens;
        assert.equal(t1[t1.length-1].type, "string");
        assert.equal(t2[0].type, "string");
    },
    
    "test: tokenize multiline attribute value with single quotes": function() {
        var line1 = this.tokenizer.getLineTokens("<a href='abc", "start");
        var t1 = line1.tokens;
        var t2 = this.tokenizer.getLineTokens('def\'>', line1.state).tokens;
        assert.equal(t1[t1.length-1].type, "string");
        assert.equal(t2[0].type, "string");
    }
};

}