function () {
    var lexgrammar = '\nRULE [0-9]\n\n%{\n hi <stuff> \n%}\n%%\n"["[^\\]]"]" %{\nreturn true;\n%}\n';
    var expected = {
        macros: {"RULE": "[0-9]"},
        actionInclude: "\n hi <stuff> \n",
        rules: [
            ["\\[[^\\]]\\]", "\nreturn true;\n"]
        ]
    };

    assert.deepEqual(lex.parse(lexgrammar), expected, "grammar should be parsed correctly");
}