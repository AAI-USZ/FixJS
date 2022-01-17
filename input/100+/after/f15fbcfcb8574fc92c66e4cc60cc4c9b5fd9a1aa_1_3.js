function testFunctions(funcs, data) {

    if( !funcs || !data ) {
      throw new Error("can't run tests without dependencies");
    }
    
    
    function expectException(f, type, message) {
    	if(!type) {
    		throw new Error("expectException needs a truthy type");
    	}
    	var threw = true,
    	    exc;
    	try {
    		f();
    		threw = false;
    	} catch(e) {
    		exc = e;
    	}
    	ok(threw, "exception expected: " + message);
    	equal(exc.type, type, "exception type: " + message + "(" + typeof(exc) + ")");
    }
    

    module("functions");
    
    var list = data.List,
        empty = list([]),
        num = data.Number;


    test("cons", function() {
        var cons = funcs.cons,
            oneEl = cons([num(14), empty]),
            twoEl = cons([num(32), oneEl]),
            oneLi = cons([empty, empty]);
        
      deepEqual(list([num(14)]), oneEl, 'an element consed onto the empty list returns a one-element list');
      
      deepEqual(list([num(32), num(14)]), twoEl, 'an element consed onto THAT returns a two-element list');
      
      deepEqual(list([]), empty, 'cons does not mutate:  it makes a new list');
      
      deepEqual(list([empty]), oneLi, 'the first argument may be of any type, including a list');
      
      expectException(function() {
          cons([num(11), num(12)]);
      }, 'TypeError', 'the second argument must be a Beagle list');
      
      expectException(function() {
          cons([num(11)]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          cons([num(3), empty, empty]);
      }, 'NumArgsError', 'too many arguments is also a problem');
    });


    test("car", function() {
    
      var car = funcs.car,
          twoEl = list([3, 4]),
          listFirst = list([list([14])]);
      
      deepEqual(3, car([twoEl]), 'car returns the first element of a list, ');
      
      deepEqual(list([14]), car([listFirst]), 'which may be a list');

      expectException(function() {
          car([empty]);
      }, 'ValueError', 'trying to take the car of an empty list throws an exception');
      
      expectException(function() {
    	  car([num(16)]);
      }, 'TypeError', "car's argument must be a list");
      
      expectException(function() {
          car([]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          car([twoEl, twoEl]);
      }, 'NumArgsError', 'too many arguments is also a problem');
    });
      

    test("cdr", function() {
    
      var cdr = funcs.cdr,
          fourEl = list([3, 4, 10, 'hello']),
          oneEl = list([64]);

      deepEqual(
          list([4, 10, 'hello']), 
          cdr([fourEl]),
          "cdr returns the 'rest' of a list after the first element"
      );
      
      deepEqual(empty, cdr([oneEl]), 'the cdr of a one-element list is an empty list');

      expectException(function() {
          cdr([empty]);
      }, 'ValueError', 'trying to take the cdr of an empty list throws an exception');
      
      expectException(function() {
          cdr([num(16)]);
    	}, 'TypeError', "cdr's argument must be a list");
      
      expectException(function() {
          cdr([]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          cdr([oneEl, oneEl]);
      }, 'NumArgsError', 'too many arguments is also a problem');

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