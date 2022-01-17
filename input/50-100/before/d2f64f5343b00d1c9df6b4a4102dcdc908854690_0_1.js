function read_sharp() {
                        skip("#");
                        switch (peek()) {
                            case "\\": next(); return token("char", read_char);
                            case "/": return token("regexp", read_regexp);
                            case "(": return token("vector", read_list);
                            case "'": next(); return token("function", read_symbol);
                            default:
                                return token("unknown", read_token);
                        }
                }