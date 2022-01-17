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
          ]),
          l3 = lis([sym('list')]),
          t = data.Boolean(true),
          cons = data.Function(funcs.cons),
          myif = data.SpecialForm(ev['if']);
          
      deepEqual(num(31), ev.eval(int_, env), "there are several self-evaluating forms: 1) numbers ...");
          
      deepEqual(str("abcde"), ev.eval(str1, env), "... 2) strings ...");

      deepEqual(t, ev.eval(t, env), "... 3) booleans ...");

      deepEqual(cons, ev.eval(cons, env), "... 4) functions ...");

      deepEqual(myif, ev.eval(myif, env), "... and 5) special forms");
          
      deepEqual(cons, ev.eval(sym1, env), "symbols evaluate to the current binding");

      expectExc(function() {
          ev.eval(sym('blarghabag'), env);
      }, 'UndefinedVariableError', 'evaluating a symbol with no binding throws an exception');
    
      deepEqual(lis([]), ev.eval(l3, env), "lists: the 1st element is eval'ed to a function/specialform and applied to the rest of the list");

      expectExc(function() {
          ev.eval(lis([]), env);
      }, 'ValueError', 'trying to evaluate the empty list throws an exception');
    
      deepEqual(
          lis([cons]),
          ev.eval(lis([sym('list'), sym('cons')]), env),
          'for function applications, the arguments are evaluated before the function is applied'
      );

      expectExc(function() {
          ev.eval(lis([sym('list'), sym('shouldblowup')]), env);
      }, 'UndefinedVariableError', 'thus, passing an unbound symbol to a function throws an exception ...');

      deepEqual(
          t,
          ev.eval(lis([sym('if'), t, t, sym('shouldblowup')]), env),
          " ... but doesn't do so for special forms that don't evaluate all their arguments"
      );
          
      deepEqual(
          num(87),
          ev.eval(l1, env),
          'this is just another example of evaluating a list'
      );
          
      deepEqual(
          lis([str('what?')]),
          ev.eval(l2, env),
          'and another list example'
      );
      
    }