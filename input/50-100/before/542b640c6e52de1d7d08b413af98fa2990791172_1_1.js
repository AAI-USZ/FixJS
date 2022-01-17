f    var lexgrammar = 'D [0-9]\nID [a-zA-Z][a-zA-Z0-9]+\n%%\n\n{D}"ohhai" {print(9);}\n"{" {return \'{\';}';
    var expected = {
        macros: {"D": "[0-9]", "ID": "[a-zA-Z][a-zA-Z0-9]+"},
        rules: [
            ["{D}ohhai\\b", "print(9);"],
            ["\\{", "return '{';"]
        ]
    };

    assert.deepEqual(lex.parse(lexgrammar), expected, "grammar should be parsed correctly");
};
