function unaryExpr( iterator ) {
            if ( iterator.current().text == '!' ) {
                iterator.next();
                return {
                    type : EXPR_T.unary,
                    oper : '!',
                    expr : primaryExpr( iterator )
                };
            }
            
            return primaryExpr( iterator );
        }