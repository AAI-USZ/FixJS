f
    module("reification");

    var SExpr = parse.SExpression,
        list = data.List,
        ch = data.Char,
        sym = data.Symbol,
        num = data.Number,
        expExc = testHelper.expectException;

    
    test("strings", function() {
    	var str = SExpr('string', "yes"),
            emptyString = SExpr('string', "");
    
    	deepEqual(
            list([ch('y'), ch('e'), ch('s')]),
            reify.makePrimitives(str), 
            'strings are reified into lists of chars'
        );
        
        deepEqual(list([]), reify.makePrimitives(emptyString), "an empty string becomes an empty list");
    	
    });
    
    
    test("symbols", function() {
    	var empty = SExpr('symbol', ""),
            starts = ['!', '@', '#', '$', '%', '^', '&', '*', '_', '-', '+', '=', '<', '>', '?', '/', 'a', 'z', 'A', 'Z'],
            // this is not an exhaustive list ... should it be?
            nonos = [',', '(', ')', '"', "'", '[', '{', '|', '\\'];
        
        starts.map(function(c) {
            deepEqual(
                sym(c), 
                reify.makePrimitives(SExpr('symbol', c)), 
                "Beagle symbols may start with " + c
            );
        });
        
        nonos.map(function(c) {
            expExc(function() {
                reify.makePrimitives(SExpr('symbol', c));
            }, 'ValueError', 'Beagle symbols may *not* start with ' + c);
        });
        
        deepEqual(
            sym('j3451kl!@#$%^&*_-+=<>?/'),
            reify.makePrimitives(SExpr('symbol', 'j3451kl!@#$%^&*_-+=<>?/')),
            "Beagle symbols may start with a letter or !@#$%^&*_-+=<>?/, followed by any number of letters, digits or !@#$%^&*()_-+=<>?/"
        );

        expExc(function() {
            reify.makePrimitives(empty);
        }, 'ValueError', "empty symbols can't be reified");
    });
    

    test("lists", function () {
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


        var l1 = list([sym('+'), list([ch('s'), ch('t'), ch('r'), ch('1')]), num(345)]);
        deepEqual(
            l1, 
            reify.makePrimitives(list1), 
            'lists containing symbols and strings are easy to reify ...'
        );

        var l2 = list([
            sym('+'), 
            list([
                sym('-'), 
                list([])
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
    });


    test("number reification", function () {
        expect(14);

        var int_ = SExpr('symbol', "345"),
            float1 = SExpr('symbol', "03."),
            float2 = SExpr('symbol', "3.456"),
            float3 = SExpr('symbol', ".001"),
            float4 = SExpr('symbol', "0.00"),
            dec = SExpr('symbol', '.'),
            b1 = SExpr('symbol', "true"),
            str = SExpr('string', '1234'),
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
          list([ch('1'), ch('2'), ch('3'), ch('4')]),
          reify.makePrimitives(str),
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
    });

}