f                if (is("operator", "/") || is("operator", "/=")) {
                        S.peeked = null;
                        S.token = S.input(S.token.value.substr(1)); // force regexp
                }
                switch (S.token.type) {
                    case "num":
                    case "string":
                    case "regexp":
                    case "operator":
                    case "atom":
                        return simple_statement();

                    case "name":
                        return is_token(peek(), "punc", ":")
                                ? labeled_statement(prog1(S.token.value, next, next))
                                : simple_statement();

                    case "punc":
                        switch (S.token.value) {
                            case "{":
                                return as("block", block_());
                            case "[":
                            case "(":
                                return simple_statement();
                            case ";":
                                next();
                                return as("block");
                            default:
                                unexpected();
                        }

                    case "keyword":
                        switch (prog1(S.token.value, next)) {
                            case "break":
                                return break_cont("break");

                            case "continue":
                                return break_cont("continue");

                            case "debugger":
                                semicolon();
                                return as("debugger");

                            case "do":
                                return (function(body){
                                        expect_token("keyword", "while");
                                        return as("do", prog1(parenthesised, semicolon), body);
                                })(in_loop(statement));

                            case "for":
                                return for_();

                            case "function":
                                return function_(true);

                            case "if":
                                return if_();

                            case "return":
                                if (S.in_function == 0)
                                        croak("'return' outside of function");
                                return as("return",
                                          is("punc", ";")
                                          ? (next(), null)
                                          : can_insert_semicolon()
                                          ? null
                                          : prog1(expression, semicolon));

                            case "switch":
                                return as("switch", parenthesised(), switch_block_());

                            case "throw":
                                if (S.token.nlb)
                                        croak("Illegal newline after 'throw'");
                                return as("throw", prog1(expression, semicolon));

                            case "try":
                                return try_();

                            case "var":
                                return prog1(var_, semicolon);

                            case "const":
                                return prog1(const_, semicolon);

                            case "while":
                                return as("while", parenthesised(), in_loop(statement));

                            case "with":
                                return as("with", parenthesised(), statement());

                            default:
                                unexpected();
                        }
                }
        });
