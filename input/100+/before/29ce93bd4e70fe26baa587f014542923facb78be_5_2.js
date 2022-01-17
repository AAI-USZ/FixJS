function testReify(reify, data, parse) {

    module("reification");

    var SExpr = parse.SExpression;


    test("makePrimitives", function () {
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
    });


    test("number reification", function () {
        expect(8);

        var int_ = SExpr('symbol', "345"),
            float1 = SExpr('symbol', "03."),
            float2 = SExpr('symbol', "3.456"),
            float3 = SExpr('symbol', ".001"),
            float4 = SExpr('symbol', "0.00"),
            dec = SExpr('symbol', '.'),
            b1 = SExpr('symbol', "true"),
            str = SExpr('string', '1234');

        deepEqual(
          data.Number(345), 
          reify.makePrimitives(int_),
          'reification produces a number if the symbol is all digits ...'
        );

        deepEqual(
          data.Number(3), 
          reify.makePrimitives(float1), 
          "... if it's digits followed by a decimal point ..."
        );

        deepEqual(
          data.Number(3.456), 
          reify.makePrimitives(float2), 
          "... or digits, decimal point, and more digits ..."
        );

        deepEqual(
          data.Number(0.001), 
          reify.makePrimitives(float3), 
          "... a leading decimal point followed by digits is fine ..."
        );

        deepEqual(
          data.Number(0.00), 
          reify.makePrimitives(float4), 
          "... and it's also okay to have leading and trialing 0's"
        );

        deepEqual(
          data.Symbol("."),
          reify.makePrimitives(dec),
          "just remember that a lone decimal point doesn't count as a number, "
        );

        deepEqual(
          data.Symbol('true'), 
          reify.makePrimitives(b1),
          'that numbers are the only symbols that get special treatment from reification,'
        );

        deepEqual(
          data.String('1234'),
          reify.makePrimitives(str),
          'and that only sexpression-symbols can be reified into numbers'
        );
    });

}