function testFunctions(funcs, data) {

    if( !funcs || !data ) {
      throw new Error("can't run tests without dependencies");
    }
    

    module("functions");


    test("cons", function() {
      deepEqual(data.List([14]), funcs.cons([14, data.List([])]));
      
      deepEqual(data.List([1, 2, 3]), funcs.cons([1, data.List([2, 3])]));
    });


    test("car", function() {
    
      var car = funcs.car;
      deepEqual(3, car([data.List([3, 4])]));
    
      // uh-oh, empty list!
      deepEqual(data.Nil(), car([data.List([])]));
      
    });
      

    test("cdr", function() {
    
      var cdr = funcs.cdr;
      deepEqual(
          data.List([4, 10, 'hello']), 
          cdr([data.List([3, 4, 10, 'hello'])])
      );
    
      // uh-oh !!
      deepEqual(data.Nil(), cdr([data.List([])]));

    });

    test("list", function() {
      
      var list = funcs.list;
      deepEqual(data.List([3, 4, 5]), list([3, 4, 5]));
      
    });

    test("+", function() {

      deepEqual(data.Number(14), funcs['+']([data.Number(18), data.Number(-4)]), "18 + (-4) = 14");

    });

    test("neg", function() {
      deepEqual(data.Number(3), funcs.neg([data.Number(-3)]), "simple negation");
      deepEqual(data.Number(-14), funcs.neg([funcs.neg([data.Number(-14)])]), "a number is its own double negative");
    });

    test("equals", function() {
      
      var eq = funcs['='],
          db = Data.Boolean,
          dl = Data.List;

      deepEqual(db(true), eq([db(true), db(true)]), 'booleans');
      deepEqual(db(false), eq([db(false), db(true)]), 'booleans');
      
      deepEqual(db(true), eq([Data.Number(31), Data.Number(31)]), 'number');
      deepEqual(db(false), eq([Data.Number(3), Data.Number(31)]), 'number');
      deepEqual(db(true), eq([Data.Number(2331), Data.Number(2331)]), 'number');
      
      deepEqual(db(true), eq([Data.String("xyz"), Data.String("xyz")]), 'strings');
      deepEqual(db(false), eq([Data.String("yz"), Data.String("xyz")]), 'strings');
      
      deepEqual(db(true), eq([Data.Symbol('abc'), Data.Symbol('abc')]), 'symbols');
      deepEqual(db(false), eq([Data.Symbol('abc'), Data.Symbol('def')]), 'symbols');
      
      deepEqual(Data.Nil(), eq([Data.Symbol('abc'), Data.String('abc')]), 'mixed types');
      deepEqual(Data.Nil(), eq([Data.Number(16), db(true)]), 'mixed types');
      
      deepEqual(db(true), eq([dl([]), dl([])]), 'empty lists');
      deepEqual(db(false), eq([dl([]), dl([Data.Number(3)])]), 'empty and non-empty lists');
      deepEqual(db(true), eq([dl([Data.Number(3)]), dl([Data.Number(3)])]), '2 non-empty lists');
      deepEqual(db(false), eq([dl([dl([db(true)])]), dl([dl([db(false)])])]), 'deeply nested lists');
      deepEqual(db(false), eq([dl([Data.Number(3)]), dl([Data.String('3')])]), 'empty and non-empty lists');
      deepEqual(
          Data.Boolean(false), 
          eq([Data.List([Data.Number(3), Data.List([])]), Data.List([Data.String('3'), Data.List([])])]), 
          'nested lists'
      );
      
    });
    
}