function() {
      var env = ev.getDefaultEnv();
      var int_ = num(31),
          str1 = str("abcde"),
          sym1 = sym('cons'),
          l1 = lis([
              sym('car'),
              lis([sym('list'), num(87)])
          ]),
          l2 = lis([
              sym('cons'),
              str('what?'),
              lis([sym('list')])
          ]);
      
      ok(false, "haven't figured out spec yet");
          
      deepEqual(num(31), ev.eval(int_, env));
          
      deepEqual(str("abcde"), ev.eval(str1, env));
          
      deepEqual(data.Function(funcs.cons), ev.eval(sym1, env));
    
      deepEqual(lis([]), ev.eval(lis([sym('list')]), env));
    
      deepEqual(lis([num(4)]), ev.eval(lis([sym('list'), num(4)]), env));
          
      deepEqual(
        num(87),
        ev.eval(l1, env)
      );
          
      deepEqual(lis([str('what?')]), ev.eval(l2, env));
      
    }