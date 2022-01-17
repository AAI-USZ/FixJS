function() {
      var o_construct_bad;
      return o_construct_bad = __contracts.guard(__contracts.object({
        a: Num,
        b: Bool
      }, {}),{
        a: 42
      });
    }