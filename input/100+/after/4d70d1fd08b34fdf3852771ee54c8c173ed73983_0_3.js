function(){
                        var i = find("*/", true),
                            text = S.text.substring(S.pos, i);
                        S.pos = i + 2;
                        S.line += text.split("\n").length - 1;
                        S.newline_before = S.newline_before || text.indexOf("\n") >= 0;

                        // https://github.com/mishoo/UglifyJS/issues/#issue/100
                        if (/^@cc_on/i.test(text)) {
                                warn("WARNING: at line " + S.line);
                                warn("*** Found \"conditional comment\": " + text);
                                warn("*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer.");
                        }

                        return token("comment2", text, true);
                }