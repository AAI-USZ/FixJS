function() {
                for (var i = 0; i < 2; ++i) {
                        ast = prepare_ifs(ast);
                        ast = walk(ast_add_scope(ast));
                }
                return ast;
        }