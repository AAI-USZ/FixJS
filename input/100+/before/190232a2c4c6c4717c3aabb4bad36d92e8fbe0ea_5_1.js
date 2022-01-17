function() {
        js('var x', ['begin', ['var', ['x']]]);
        js('var x = 1.2', ['begin', ['var', ['x', ['number', 1.2]]]]);
        js('var x = 1e2, y, z;', ['begin',
           ['var', ['x', ['number', 100]], ['y'], ['z']]
        ]);
        js('x.y', [ 'begin', [ 'getp', [ 'string', 'y' ], [ 'get' , 'x' ] ] ]);

        js('function a() {}', ['begin',
           ['var', ['a', ['func', [], ['begin']]]]
        ]);

        js('function a() {return a()}', ['begin',
           ['var', ['a', ['func', [], ['begin', [
             'return', ['call', ['get', 'a']]
           ]]]]]
        ]);

        js('function a() {return a()};"123"+"456"', ['begin',
           ['var', ['a', ['func', [], [
             'begin', ['return', ['call', ['get', 'a']]]
           ]]]],
           ['get', 'undefined'],
           ['binop', '+', ['string', '123'], ['string', '456']]
        ]);

        js('/a/', ['begin', ['regExp', '/a/']]);

        js('{ a: 1 , b: 2 }', [
           'begin',
           [ 'json',
             ['binding','a',['number',1]],
             ['binding','b',['number',2]]
           ]
        ]);

        js('var a = b || c\nx', [
           'begin',
           ['var', ['a',['binop','||',['get','b'],['get','c']]]],
           ['get','x']
        ]);

        js('a[b].x().l', ['begin',
           ['getp',
             ['string','l'],
             ['call',['getp',['string','x'],['getp',['get','b'],['get','a']]]]
           ]
        ]);
      }