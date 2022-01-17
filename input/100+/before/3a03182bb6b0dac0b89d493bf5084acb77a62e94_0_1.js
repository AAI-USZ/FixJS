function(source) {
        var self, tokens, tokenIndex, lexer, parserContext;
        self = this;
        tokens = [];
        tokenIndex = undefined;
        lexer = createDynamicLexer({
            nextLexer: jisonLexer,
            source: source
        });
        parserContext = createParserContext({
            terms: terms
        });
        parserContext.lexer = lexer;
        jisonLexer.yy = parserContext;
        tokenIndex = lexer.lex();
        while (tokenIndex !== 1) {
            var token, text, lexerToken;
            token = function() {
                if (typeof tokenIndex === "number") {
                    return parser.terminals_[tokenIndex];
                } else if (tokenIndex === "") {
                    return undefined;
                } else {
                    return tokenIndex;
                }
            }();
            text = function() {
                if (lexer.yytext === "") {
                    return undefined;
                } else if (lexer.yytext === token) {
                    return undefined;
                } else {
                    return lexer.yytext;
                }
            }();
            lexerToken = function() {
                if (text) {
                    return [ token, text ];
                } else {
                    return [ token ];
                }
            }();
            tokens.push(lexerToken);
            tokenIndex = lexer.lex();
        }
        return tokens;
    }