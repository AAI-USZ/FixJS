function testFunctions(funcs, data, testHelper) {

    if( !funcs || !data ) {
      throw new Error("can't run tests without dependencies");
    }
    

    module("functions");
    
    var list = data.List,
        str = data.String,
        sym = data.Symbol,
        empty = list([]),
        num = data.Number,
        expectException = testHelper.expectException;


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
      
      var listf = funcs.list;
      deepEqual(list([3, 4, 5]), listf([3, 4, 5]), "'list' is a variadic function which returns its arguments in a list");
      
    });


    test("+", function() {

      var plus = funcs['+'];

      deepEqual(num(32), plus([num(27), num(5)]), "'+' is for adding two numbers");

      deepEqual(num(14), plus([num(18), num(-4)]), "they can be positive or negative");

      deepEqual(num(-17), plus([num(-9), num(-8)]), "or both negative");

      expectException(function() {
          plus([list([]), num(4)]);
      }, 'TypeError', 'both the first argument ...');
      
      expectException(function() {
          plus([num(8), list([])]);
        }, 'TypeError', "and the second argument must be numbers");
      
      expectException(function() {
          plus([num(4)]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          plus([num(4), num(5), num(6)]);
      }, 'NumArgsError', 'as does too many arguments');

    });


    test("neg", function() {
      var neg = funcs.neg,
          p3 = num(3),
          m3 = num(-3),
          m14 = num(-14);

      deepEqual(m3, neg([p3]), "'neg' negates a number, flipping the sign");

      deepEqual(m14, neg([neg([m14])]), "a number is its own double negative");
      
      expectException(function() {
          neg([list([])]);
        }, 'TypeError', "the first argument must be a number");
      
      expectException(function() {
          neg([]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          neg([num(4), num(5)]);
      }, 'NumArgsError', 'as does too many arguments');
    });


    test("eq?", function() {
      
      var eq = funcs['eq?'],
          db = Data.Boolean,
          t = db(true),
          f = db(false);

      deepEqual(t, eq([t, t]), 'booleans');
      deepEqual(f, eq([f, t]), 'booleans');
      

      deepEqual(f, eq([num(3), num(31)]), 'number');
      deepEqual(t, eq([num(2331), num(2331)]), 'number');
      
      deepEqual(t, eq([str("xyz"), str("xyz")]), 'strings');
      deepEqual(f, eq([str("yz"), str("xyz")]), 'strings');
      
      deepEqual(t, eq([sym('abc'), sym('abc')]), 'symbols');
      deepEqual(f, eq([sym('abc'), sym('def')]), 'symbols');
      
      expectException(function() {
          eq([num(16), db(true)]);
      }, 'TypeError', "'eq?' arguments must be of the same type");
            
      expectException(function() {
          eq([list(7), list(7)]);
      }, 'TypeError', "'eq?' does not work on lists");
            
      expectException(function() {
          eq([num(7)]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          eq([num(4), num(5), num(8)]);
      }, 'NumArgsError', 'as does too many arguments');
      
    });
    
    
    test("prim-type", function() {
        var type = funcs['prim-type'];

        deepEqual(str("number"), type([num(14)]), "'prim-type' is a function of one argument");
        
        deepEqual(str("list"), type([list([])]), "it returns the type of its argument as a string");
        
        expectException(function() {
            type([]);
        }, 'NumArgsError', 'too few arguments throws an exception ...');
        
        expectException(function() {
            type([num(5), num(8)]);
        }, 'NumArgsError', 'as does too many arguments');
        
    });
    
    
    test("null?", function() {
        var n = funcs['null?'],
            empty = list([]);

        deepEqual(data.Boolean(true), n([empty]), "'null?' takes one argument:  a list");
        
        deepEqual(data.Boolean(false), n([list([str("list")])]), "it returns true if the list is empty, and false otherwise");

        expectException(function() {
            n([num(4)]);
        }, 'TypeError', 'remember to give it lists');
        
        expectException(function() {
            n([]);
        }, 'NumArgsError', 'too few arguments throws an exception ...');
        
        expectException(function() {
            n([empty, empty]);
        }, 'NumArgsError', 'as does too many arguments');
        
    });
    
    
    test("number-<", function() {
        var lt = funcs['number-<'];

        deepEqual(data.Boolean(false), lt([num(2), num(1)]), "'number-<' takes two numbers and compares them");
        
        deepEqual(data.Boolean(true), lt([num(11), num(39)]), "it returns true if the first is < the second");
        
        deepEqual(data.Boolean(false), lt([num(4), num(4)]), "and false otherwise -- including if they're the same");

        expectException(function() {
            lt([list([]), num(4)]);
        }, 'TypeError', 'remember to give it numbers');
        
        expectException(function() {
            lt([num(1)]);
        }, 'NumArgsError', 'too few arguments throws an exception ...');
        
        expectException(function() {
            lt([num(1), num(2), num(3)]);
        }, 'NumArgsError', 'as does too many arguments');
    });
    
    
    test("data, udt-type and udt-value", function() {
        var da = funcs['data'],
            con1 = da([str("obj")]),
            ut = funcs['udt-type'],
            uv = funcs['udt-value'],
            obj1 = con1.value([num(39)]);

        deepEqual(
            "function", 
            con1.type, 
            "'data' creates user-defined types, taking one string argument and returning a constructor function"
        );
        
        deepEqual(
            data.UserDefined("obj", num(39)), 
            obj1, 
            "constructors take one argument, and return an object with the appropriate type"
        );

        expectException(function() {
            da([num(4)]);
        }, 'TypeError', "remember to give 'data' a string");
        
        expectException(function() {
            da([]);
        }, 'NumArgsError', 'too few args: exception');
        
        expectException(function() {
            da([str("abc"), str("def")]);
        }, 'NumArgsError', 'too many: exception');
        
        
        deepEqual(str("obj"), ut([obj1]), "udt-type returns the type (as a string) of a user-defined datatype");
        
        expectException(function() {
            ut([num(13)]);
        }, 'TypeError', "udt-type only works on user-defined types");
        
        
        deepEqual(num(39), uv([obj1]), "'udt-value' returns the value of a user-defined datatype");
        
        expectException(function() {
            uv([num(13)]);
        }, 'TypeError', "'udt-value' also only works on user-defined types");
    });
    
}