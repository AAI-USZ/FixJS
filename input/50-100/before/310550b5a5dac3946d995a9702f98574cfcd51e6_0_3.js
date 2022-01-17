function andExpr( iterator ) {
            var expr = relationExpr( iterator );
            var oper;
            if ( ( oper = iterator.next() ) && oper.text == '&&' ) {
                expr = {
                    type  : EXPR_T.and, 
                    expr1 : expr, 
                    expr2 : andExpr( iterator ) 
                };
            }

            return expr;
        }