function() {
      expect(12);

      function sym(v) {
        return {'type': 'symbol', 'value': v};
      }

      var int_ = sym("345"),
          empty = sym(""),
          float1 = sym("03."),
          float2 = sym("3.456"),
          float3 = sym(".001"),
          float4 = sym("0.01"),
          str = {'type': 'string', 'value': "yes this is a string"},
          notstr = sym('"open'),
          sym1 = sym('*?#""/'),
          list1 = {'type': 'list', 'value': [sym("+"), {'type': 'string', 'value': 'str1'}, sym("345")]},
          list2 = {
            'type': 'list',
            'value': [
              sym("+"), 
              {'type': 'list', 'value': [sym("-"), sym("34.32")]}, 
              sym('"omg')
            ]
          };
          b1 = sym("true");
          
      deepEqual(data.Number(345), reify.makePrimitives(int_));
          
      try {
        var e = reify.makePrimitives(empty);
        ok(0);
      } catch(e) {
        ok(1, "can't make primitive of empty string");
      };
          
      deepEqual(data.Number(3), reify.makePrimitives(float1), "float with decimal point");
          
      deepEqual(data.Number(3.456), reify.makePrimitives(float2), "float with leading and trailing digits");
          
      deepEqual(data.Number(0.001), reify.makePrimitives(float3), "float with leading decimal point");
          
      deepEqual(data.Number(0.01), reify.makePrimitives(float4), "float with leading 0");
          
      deepEqual(data.String("yes this is a string"), reify.makePrimitives(str), 'string');
          
      deepEqual(data.Symbol('"open'), reify.makePrimitives(notstr), 'symbol (with leading ")');
          
      deepEqual(data.Symbol('*?#""/'), reify.makePrimitives(sym1), 'symbol with funky chars');
          
      var l1 = data.List([data.Symbol('+'), data.String('str1'), data.Number(345)]);
      deepEqual(l1, reify.makePrimitives(list1), 'simple list');
          
      var l2 = data.List([
          data.Symbol('+'),
          data.List([data.Symbol('-'), data.Number(34.32)]),
          data.Symbol('"omg')
      ]);
      deepEqual(l2, reify.makePrimitives(list2));
      
      deepEqual(data.Symbol('true'), reify.makePrimitives(b1));
    }