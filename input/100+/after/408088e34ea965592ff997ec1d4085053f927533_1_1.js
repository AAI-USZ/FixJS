function() {
      var grmr = common.ometajs.grammars.BSJSTranslator;

      function unit(name, ast, source) {
        test(name, function() {
          assert.equal(grmr.match(ast, 'trans'), source);
        });
      }

      unit('undefined', ['get', 'undefined'], 'undefined');
      unit('basic name', ['get', 'a'], 'a');
      unit('var declaration', ['var', ['x', ['number', 1]]], 'var x = 1');
      unit('var declaration (with binop)', [
        'var', ['x', ['binop', ',', ['number', 1], ['number', 2]]]
      ], 'var x = (1 , 2)');
      unit('two statements', ['begin',
        ['stmt', ['var', 'x']],
        ['stmt', ['var', 'y']]
      ], '{var x;var y}');
      unit(
        'block with statements',
        [ 'begin',
          ['stmt', ['get', 'x']],
          ['stmt', ['var', ['x', ['number', 1]]]]
        ],
        '{x;var x = 1}'
      );
      unit(
        'binop',
        ['binop', '+', ['get', 'x'], ['get', 'y']],
        'x + y'
      );
      unit(
        'binop and assignment',
        ['binop', '+', ['get', 'x'], ['set', ['get', 'y'], ['number', 1]]],
        'x + (y = 1)'
      );
      unit(
        'complex assignment',
        ['set', ['getp', ['get', 'x'], ['get', 'y']], ['get', 'z']],
        'y[x] = z'
      );
      unit(
        'anonymous call',
        ['call', ['func', null, [], ['begin']]],
        '(function (){})()'
      );
      unit(
        'delete keyword',
        ['unop', 'delete', ['get', 'a']],
        'delete a'
      );
      unit(
        'property lookup (regr)',
        ['getp', ['string', 'a-b'], ['get', 'a']],
        'a["a-b"]'
      );
      unit(
        'property lookup (regr#2)',
        ['getp', ['string', 'for'], ['get', 'a']],
        'a["for"]'
      );
      unit(
        'typeof plus dot',
        ['getp', ['string', 'b'], ['unop', 'typeof', ['get', 'a']]],
        '(typeof a).b'
      );
    }