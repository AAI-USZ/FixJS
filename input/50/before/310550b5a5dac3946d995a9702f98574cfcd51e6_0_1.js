function primaryExpr( iterator ) {
            var expr = iterator.current();
            if ( expr.text == '(' ) {
                iterator.next();
                expr = orExpr( iterator );
                iterator.next();
            }

            return expr;
        }