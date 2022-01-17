function foldr1(f_53) {
      return function(_temp_54) {
        return function(v) {
          if("Cons" !== v[0]) {
            return undefined
          }else {
            var x_55 = v[1];
            var xs_56 = v[2];
            return foldr(f_53)(x_55)(xs_56)
          }
        }(_temp_54)
      }
    }