function relationExpr( iterator ) {
            var expr = unaryExpr( iterator );
            var oper;
            if ( ( oper = iterator.next() ) && /^[><=]+$/.test( oper.text ) ) {
                iterator.next();
                expr = {
                    type  : EXPR_T.relation, 
                    expr1 : expr, 
                    expr2 : unaryExpr( iterator ), 
                    oper  : oper.text 
                };
            }

            return expr;
        }