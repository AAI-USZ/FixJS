function must_has_semicolon(node) {
                switch (node[0]) {
                    case "with":
                    case "while":
                        return empty(node[2]) || must_has_semicolon(node[2]);
                    case "for":
                    case "for-in":
                        return empty(node[4]) || must_has_semicolon(node[4]);
                    case "if":
                        if (empty(node[2]) && !node[3]) return true; // `if' with empty `then' and no `else'
                        if (node[3]) {
                                if (empty(node[3])) return true; // `else' present but empty
                                return must_has_semicolon(node[3]); // dive into the `else' branch
                        }
                        return must_has_semicolon(node[2]); // dive into the `then' branch
                    case "directive":
                        return true;
                }
        }