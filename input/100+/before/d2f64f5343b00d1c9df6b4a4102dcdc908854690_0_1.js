function token(type, reader, adjust_start) {
                        if (adjust_start == null) adjust_start = 0;
                        var save_parent = parent;
                        try {
                                var tok = {
                                        index   : list_index,
                                        type    : type,
                                        start   : input.pos + adjust_start,
                                        parent  : parent,
                                        depth   : parent ? parent.depth + 1 : 0,
                                        partial : false
                                };
                                if (type == "list") parent = tok;
                                try {
                                        tok.value = reader ? reader() : null;
                                } catch(ex) {
                                        if (ex instanceof Partial) {
                                                tok.value = ex.value;
                                                tok.partial = true;
                                        } else {
                                                throw ex;
                                        }
                                }
                                tok.end = input.pos;
                                if (caret != null) {
                                        if (tok.start <= caret && tok.end >= caret) {
                                                if (!cont_exp) cont_exp = tok;
                                        }
                                }
                                return tok;
                        } finally {
                                parent = save_parent;
                        }
                }