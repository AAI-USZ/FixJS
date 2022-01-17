function(objToTest, expected, msg) {
      if (!objToTest) ok(false, "missing objToTest");
      if (!expected) ok(false, "missing objToTest");

      for(var i=0, key; key=expected[i]; ++i) {
        ok(key in objToTest, msg || ("object contains " + key));
      }
    }