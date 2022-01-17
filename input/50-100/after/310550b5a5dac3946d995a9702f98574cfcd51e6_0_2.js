function orExpr( iterator ) {
            var expr = andExpr( iterator );
            var oper;
            if ( ( oper = iterator.current() ) && oper.text == '||' ) {
                iterator.next();
                expr = {
                    type  : EXPR_T.or, 
                    expr1 : expr, 
                    expr2 : orExpr( iterator ) 
                };
            }

            return expr;
        }