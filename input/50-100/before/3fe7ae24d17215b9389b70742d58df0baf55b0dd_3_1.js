function(objToTest, expected, msg) {
      if (!objToTest) {
        ok(false, "Missing object to test against");
        return;
      }

      for(var i=0, key; key=expected[i]; ++i) {
        ok(key in objToTest, msg || ("object contains " + key));
      }
    }