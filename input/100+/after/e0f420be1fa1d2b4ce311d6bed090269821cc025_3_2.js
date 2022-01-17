function () {
        expect(4);

        var list1 = SExpr('list', [
                SExpr('symbol', "+"),
                SExpr('string', 'str1'),
                SExpr('symbol', "345")
            ]),
            list2 = SExpr('list', [
                SExpr('symbol', "+"),
                SExpr('list', [SExpr('symbol', "-"), SExpr('string', "")]),
                SExpr('symbol', '>>>')
            ]),
            badtype = SExpr('boolean', 'false');


        var l1 = list([sym('+'), str('str1'), num(345)]);
        deepEqual(
            l1, 
            reify.makePrimitives(list1), 
            'lists containing symbols and strings are easy to reify ...'
        );

        var l2 = list([
            sym('+'), 
            list([
                sym('-'), 
                str("")
            ]), 
            sym('>>>')
        ]);
        deepEqual(
            l2, 
            reify.makePrimitives(list2),
            '... as are nested lists (as long as they have strings and symbols!)'
        );

        expExc(function() {
            reify.makePrimitives(badtype);
        }, 'TypeError', "reification only recognizes SExpression types 'string', 'symbol', and 'list'");
    }