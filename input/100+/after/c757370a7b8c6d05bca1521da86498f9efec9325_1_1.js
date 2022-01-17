function() {
        js('var x', ['begin', ['stmt', ['var', ['x']]]]);
        js('var x = 1.2', ['begin', ['stmt', ['var', ['x', ['number', 1.2]]]]]);
        js('var x = 1e2, y, z;', ['begin',
           ['stmt', ['var', ['x', ['number', 100]], ['y'], ['z']]]
        ]);
        js('x.y', [ 'begin',
           ['stmt', [ 'getp', [ 'string', 'y' ], [ 'get' , 'x' ] ]]
        ]);

        js('function a() {}', ['begin',
           ['stmt', ['func', 'a', [], ['begin']]]
        ]);

        js('function a() {return a()}', ['begin',
           ['stmt',['func','a',[],[
             'begin',['stmt',['return',['call',['get','a']]]]
           ]]]
        ]);

        js('function a() {return a()};"123"+"456"', ['begin',
           ['stmt', ['func', 'a', [], [
             'begin', ['stmt', ['return', ['call', ['get', 'a']]]]
           ]]],
           ['stmt', ['binop', '+', ['string', '123'], ['string', '456']]]
        ]);

        js('/a/', ['begin', ['stmt', ['regExp', '/a/']]]);

        js('{ a: 1 , b: 2 }', [
           'begin',
           ['stmt', [ 'json',
             ['binding','a',['number',1]],
             ['binding','b',['number',2]]
           ]]
        ]);

        js('var a = b || c;x', [
           'begin',
           ['stmt', ['var', ['a',['binop','||',['get','b'],['get','c']]]]],
           ['stmt', ['get','x']]
        ]);

        js('a[b].x().l', ['begin',
           ['stmt', ['getp',
             ['string','l'],
             ['call',['getp',['string','x'],['getp',['get','b'],['get','a']]]]
           ]]
        ]);

        js('a.x = function i() {}', [
           'begin',
           ['stmt',['set',
             ['getp',['string','x'],['get','a']],
             ['func','i',[],['begin']]
           ]]
        ]);
      }