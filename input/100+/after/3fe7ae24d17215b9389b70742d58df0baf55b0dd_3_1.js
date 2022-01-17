function(objToTest, expected, msg) {
      if (!objToTest) ok(false, "missing objToTest");
      if (!expected) ok(false, "missing objToTest");

      for(var key in expected) {
        deepEqual(objToTest[key], expected[key], key + " set to: " + expected[key] + (msg ? " - " + msg : ""));
      }
    }