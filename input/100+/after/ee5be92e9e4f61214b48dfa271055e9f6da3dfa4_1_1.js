function () {
        expect(7);

        var str = SExpr('string', "yes this is a string"),
            empty = SExpr('symbol', ""),
            notstr = SExpr('symbol', '"open'),
            sym1 = SExpr('symbol', '*?#""/'),
            list1 = SExpr('list', [
                SExpr('symbol', "+"),
                SExpr('string', 'str1'),
                SExpr('symbol', "345")
            ]),
            list2 = SExpr('list', [
                SExpr('symbol', "+"),
                SExpr('list', [SExpr('symbol', "-"), SExpr('symbol', "34.32")]),
                SExpr('symbol', '"omg')
            ]),
            badtype = SExpr('boolean', 'false');

        try {
            var e = reify.makePrimitives(empty);
            ok(0);
        } catch (e) {
            ok(1, "the symbol of the empty string can't be reified ... ");
        };

        deepEqual(
          data.String("yes this is a string"),
          reify.makePrimitives(str), 
          '... but strings can ...'
        );

        deepEqual(
          data.Symbol('"open'), 
          reify.makePrimitives(notstr), 
          '... so can symbols -- even if they have weird characters ...'
        );

        deepEqual(
          data.Symbol('*?#""/'), 
          reify.makePrimitives(sym1), 
          '... and so can symbols with even weirder characters ...'
        );

        var l1 = data.List([data.Symbol('+'), data.String('str1'), data.Number(345)]);
        deepEqual(
          l1, 
          reify.makePrimitives(list1), 
          '... lists containing symbols and strings are easy to reify ...'
        );

        var l2 = data.List([
          data.Symbol('+'), 
          data.List([
            data.Symbol('-'), 
            data.Number(34.32)
          ]), 
          data.Symbol('"omg')
        ]);
        deepEqual(
          l2, 
          reify.makePrimitives(list2),
          '... as are nested lists (as long as they have strings and symbols!)'
        );

        var bad1 = true;
        try {
            reify.makePrimitives(badtype);
            bad1 = false;
        } catch(e) {};
        ok(bad1, "reification only recognizes SExpression types 'string', 'symbol', and 'list'");
    }