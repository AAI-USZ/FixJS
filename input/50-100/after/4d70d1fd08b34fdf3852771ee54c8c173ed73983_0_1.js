function next() {
                S.prev = S.token;
                if (S.peeked) {
                        S.token = S.peeked;
                        S.peeked = null;
                } else {
                        S.token = S.input();
                }
                S.in_directives = S.in_directives && (
                        S.token.type == "string" || is("punc", ";")
                );
                return S.token;
        }