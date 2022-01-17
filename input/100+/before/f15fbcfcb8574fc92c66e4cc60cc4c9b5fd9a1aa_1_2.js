function() {
      
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
      
    }