function(keyword) {
      var k;
      if (keyword instanceof C.Symbol) {
        return k = keyword.value;
      } else if (keyword instanceof C.String) {
        return k = keyword;
      }
    }