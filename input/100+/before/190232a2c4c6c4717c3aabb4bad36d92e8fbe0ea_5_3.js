function() {
      var grmr = common.ometajs.grammars.BSJSTranslator;

      function unit(name, ast, source) {
        test(name, function() {
          assert.equal(grmr.match(ast, 'trans'), source);
        });
      }

      unit('undefined', ['get', 'undefined'], 'undefined');
      unit('basic name', ['get', 'a'], 'a');
      unit('var declaration', ['var', ['x', ['number', 1]]], 'var x = (1)');
      unit(
        'block with statements',
        ['begin', ['get', 'x'], ['var', ['x', ['number', 1]]]],
        '{x;var x = (1)}'
      );
      unit(
        'binop',
        ['binop', '+', ['get', 'x'], ['get', 'y']],
        '(x + y)'
      );
      unit(
        'complex assignment',
        ['set', ['getp', ['get', 'x'], ['get', 'y']], ['get', 'z']],
        '(y[x]=z)'
      );
    }