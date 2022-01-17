function(require, exports, module) {
"use strict";

var HtmlMode = require("./html").Mode;
var assert = require("../test/assertions");

var testData = {
    "test: tokenize embedded script" : [{
        text: "<script a='a'>var</script>'123'",
        state: ["start", "start"],
        tokens: [{
            type: "meta.tag",
            value: "<"
        }, {
            type: "meta.tag.tag-name.script",
            value: "script"
        }, {
            type: "text",
            value: " "
        }, {
            type: "entity.other.attribute-name",
            value: "a"
        }, {
            type: "keyword.operator",
            value: "="
        }, {
            type: "string",
            value: "'a'"
        }, {
            type: "meta.tag",
            value: ">"
        }, {
            type: "storage.type",
            value: "var"
        }, {
            type: "meta.tag",
            value: "</"
        }, {
            type: "meta.tag.tag-name.script",
            value: "script"
        }, {
            type: "meta.tag",
            value: ">"
        }, {
            type: "text",
            value: "'123'"
        }]
    }],

    "test: tokenize multiline attribute value with double quotes": [{
        text: "<a href=\"abc",
        state: [ "start", "tag_qqstring"],
        tokens: [{
                type: "meta.tag",
                value: "<"
            }, {
                type: "meta.tag.tag-name.anchor",
                value: "a"
            }, {
                type: "text",
                value: " "
            }, {
                type: "entity.other.attribute-name",
                value: "href"
            }, {
                type: "keyword.operator",
                value: "="
            }, {
                type: "string",
                value: "\"abc"
            }
        ]
    }, {
        text: "def\">",
        state: [ "tag_qqstring", "start" ],
        tokens: [ {
                type: "string",
                value: "def\""
            }, {
                type: "meta.tag",
                value: ">"
            }
        ]
    }],

    "test: tokenize multiline attribute value with single quotes": [{
        text: "<a href='abc",
        state: ["start", "tag_qstring"],
        tokens: [{
                type: "meta.tag",
                value: "<"
            }, {
                type: "meta.tag.tag-name.anchor",
                value: "a"
            }, {
                type: "text",
                value: " "
            }, {
                type: "entity.other.attribute-name",
                value: "href"
            }, {
                type: "keyword.operator",
                value: "="
            }, {
                type: "string",
                value: "'abc"
            }
        ]
    }, {
        text: "def\"'>",
        state: [ "tag_qstring", "start" ],
        tokens: [ {
                type: "string",
                value: "def\"'"
            }, {
                type: "meta.tag",
                value: ">"
            }
        ]
    }]
};

function generateTest(exampleData) {
    return function testTokenizer() {
        for (var i = 0; i < exampleData.length; i++) {
            var s = exampleData[i];
            var lineTokens = tokenizer.getLineTokens(s.text, s.state[0]);

            assert.equal(
                JSON.stringify(lineTokens, null, 4),
                JSON.stringify({tokens:s.tokens, state: s.state[1]}, null, 4)
            );
        }
    }
}

var tokenizer;
module.exports = {
    setUp : function() {
        tokenizer = new HtmlMode().getTokenizer();
    }
}

for (var i in testData) {
    module.exports[i] = generateTest(testData[i])
}

}