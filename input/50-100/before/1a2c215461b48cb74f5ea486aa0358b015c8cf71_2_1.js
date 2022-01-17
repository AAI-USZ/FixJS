function(objToTest, expected, msg) {
      for(var key in expected) {
        equal(objToTest[key], expected[key], key + " set to: " + expected[key] + (msg ? " - " + msg : ""));
      }
    }