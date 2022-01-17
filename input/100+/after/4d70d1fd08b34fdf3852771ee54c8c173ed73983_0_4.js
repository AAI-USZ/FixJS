function read_name() {
                var backslash = false, name = "", ch, escaped = false, hex;
                while ((ch = peek()) != null) {
                        if (!backslash) {
                                if (ch == "\\") escaped = backslash = true, next();
                                else if (is_identifier_char(ch)) name += next();
                                else break;
                        }
                        else {
                                if (ch != "u") parse_error("Expecting UnicodeEscapeSequence -- uXXXX");
                                ch = read_escaped_char();
                                if (!is_identifier_char(ch)) parse_error("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                                name += ch;
                                backslash = false;
                        }
                }
                if (HOP(KEYWORDS, name) && escaped) {
                        hex = name.charCodeAt(0).toString(16).toUpperCase();
                        name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
                }
                return name;
        }