function(keyword) {
      if (keyword instanceof C.Symbol) {
        return new C.String(keyword.value, keyword.yy);
      } else if (keyword instanceof C.String) {
        return k;
      }
    }