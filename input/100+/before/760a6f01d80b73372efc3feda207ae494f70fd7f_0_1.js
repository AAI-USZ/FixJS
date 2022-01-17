function() {
    var lexData2 = {
        rules: [
           ["0", "return 'ZERO';"],
           ["\\+", "return 'PLUS';"],
           [";", "return ';';"],
           ["$", "return 'EOF';"]
        ]
    };
    var grammar = {
        bnf: {
            "S" :[ [ "Exp EOF",    "return $1" ]],
            "Exp" :[ [ "E ;",    "$$ = $1;" ],
                     [ "E error", "$$ = $1;" ]],
            "E" :[ [ "E PLUS T", "$$ = ['+',$1,$3]"  ],
                   [ "T",        "$$ = $1" ]  ],
            "T" :[ [ "ZERO",     "$$ = [0]" ] ]
        }
    };

    var parser = new Jison.Parser(grammar, {debug: true});
    parser.lexer = new Lexer(lexData2);

    var expectedAST = ["+", ["+", [0], [0]], [0]];

    assert.deepEqual(parser.parse("0+0+0>"), expectedAST);
}