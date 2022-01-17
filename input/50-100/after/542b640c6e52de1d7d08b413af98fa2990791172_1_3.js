function () {
    var lexgrammar = '%%\n"["[^\\]]"]" {\nvar b={};return true;\n}\n';
    var expected = {
        rules: [
            ["\\[[^\\]]\\]", "\nvar b={};return true;\n"]
        ]
    };

    assert.deepEqual(lex.parse(lexgrammar), expected, "grammar should be parsed correctly");
}