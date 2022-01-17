function () {
        expect(14);

        var int_ = SExpr('symbol', "345"),
            float1 = SExpr('symbol', "03."),
            float2 = SExpr('symbol', "3.456"),
            float3 = SExpr('symbol', ".001"),
            float4 = SExpr('symbol', "0.00"),
            dec = SExpr('symbol', '.'),
            b1 = SExpr('symbol', "true"),
            str1 = SExpr('string', '1234'),
            notANum = SExpr('symbol', '4..0');

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
        
        expExc(function() {
            reify.makePrimitives(notANum);
        }, 'ValueError', "that if it starts with a digit, it *must* be reifiable as a number");

        deepEqual(
          data.Symbol('true'), 
          reify.makePrimitives(b1),
          'that numbers are the only symbols that get special treatment from reification,'
        );

        deepEqual(
          str('1234'),
          reify.makePrimitives(str1),
          "that only sexpressions whose types are 'symbol' -- not 'string' -- can be reified into numbers,"
        );
        
        expExc(function() {
            reify.makePrimitives(SExpr('symbol', '.'));
        }, 'ValueError', "that the sexpression symbol '.' can not be reified,");

        deepEqual(
            num(0),
            reify.makePrimitives(SExpr('symbol', '0')),
            "that sexpression symbols with leading digits must be reified as numbers,"
        );
        
        expExc(function() {
            reify.makePrimitives(SExpr('symbol', '0a'));
        }, 'ValueError', "and thus, if it starts with a digit, but can't be reified as a number, it's an error");
    }