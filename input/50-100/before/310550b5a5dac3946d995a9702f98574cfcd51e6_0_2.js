function orExpr( iterator ) {
            var expr = andExpr( iterator );
            var oper;
            if ( ( oper = iterator.next() ) && oper.text == '||' ) {
                expr = {
                    type  : EXPR_T.or, 
                    expr1 : expr, 
                    expr2 : opExpr( iterator ) 
                };
            }

            return expr;
        }