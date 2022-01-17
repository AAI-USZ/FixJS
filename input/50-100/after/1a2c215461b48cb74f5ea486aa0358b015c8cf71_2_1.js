function(objToTest, expected, msg) {
      for(var key in expected) {
        deepEqual(objToTest[key], expected[key], key + " set to: " + expected[key] + (msg ? " - " + msg : ""));
      }
    }