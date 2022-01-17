function(require, exports, module) {
"use strict";

var XmlMode = require("./xml").Mode;
var assert = require("../test/assertions");

var testData = {
    "test: tokenize1" : [{
        text: "<Juhu>//Juhu Kinners</Kinners>",
        state: ["start", "start"],
        tokens: [
            {
                type: "meta.tag",
                value: "<"
            },
            {
                type: "meta.tag.tag-name",
                value: "Juhu"
            },
            {
                type: "meta.tag",
                value: ">"
            },
            {
                type: "text",
                value: "//Juhu Kinners"
            },
            {
                type: "meta.tag",
                value: "</"
            },
            {
                type: "meta.tag.tag-name",
                value: "Kinners"
            },
            {
                type: "meta.tag",
                value: ">"
            }
        ]
    }],

    "test: two tags in the same lines should be in separate tokens": [{
        text: "<Juhu><Kinners>",
        state: [ "start", "start"],
        tokens: [
            {
                type: "meta.tag",
                value: "<"
            },
            {
                type: "meta.tag.tag-name",
                value: "Juhu"
            },
            {
                type: "meta.tag",
                value: ">"
            },
            {
                type: "meta.tag",
                value: "<"
            },
            {
                type: "meta.tag.tag-name",
                value: "Kinners"
            },
            {
                type: "meta.tag",
                value: ">"
            }
        ]
    }],

    "test: multiline attributes": [{
        text: "<copy set=\"{",
        state: ["start", "tag_qqstring"],
        tokens: [
            {
                type: "meta.tag",
                value: "<"
            },
            {
                type: "meta.tag.tag-name",
                value: "copy"
            },
            {
                type: "text",
                value: " "
            },
            {
                type: "entity.other.attribute-name",
                value: "set"
            },
            {
                type: "keyword.operator",
                value: "="
            },
            {
                type: "string",
                value: "\"{"
            }
        ]
    }, {
        text: "}\" undo=\"{",
        state: [ "tag_qqstring", "tag_qqstring"],
        tokens: [
            {
                type: "string",
                value: "}\""
            },
            {
                type: "text",
                value: " "
            },
            {
                type: "entity.other.attribute-name",
                value: "undo"
            },
            {
                type: "keyword.operator",
                value: "="
            },
            {
                type: "string",
                value: "\"{"
            }
        ]
    }, {
        text: "}\"/>",
        state: ["tag_qqstring", "start"],
        tokens: [
            {
                type: "string",
                value: "}\""
            },
            {
                type: "meta.tag",
                value: "/>"
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
    name: "XML Tokenizer",

    setUp : function() {
        tokenizer = new XmlMode().getTokenizer();
    }
}

for (var i in testData) {
    module.exports[i] = generateTest(testData[i])
}
}