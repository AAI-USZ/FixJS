function () {
      if(!src || !src.length) {
        throw "Cannot parse empty pattern";
      }

      var AST = stage1([]);
      /**
       * Clear trailing whitespace
       */
      clear();

      if(index !== src.length) {
        throw "Expected end of input but tokens found: " + index;
      }
      return AST;
    }