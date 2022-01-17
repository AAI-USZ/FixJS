function(env, cont) {
          Parse.defGroup(open(), close());
          return cont(tmpFalse);
        }