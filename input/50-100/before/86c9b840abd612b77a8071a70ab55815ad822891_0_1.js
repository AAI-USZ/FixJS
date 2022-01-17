function () {
      var U = Union({
          'ival': 'int'
        , 'lval': 'long'
        , 'sval': 'string'
      })

      assert.strictEqual(ref.types.int, U.fields.ival.type)
      assert.strictEqual(ref.types.long, U.fields.lval.type)
      assert.strictEqual(ref.types.Utf8String, U.fields.sval.type)
    }