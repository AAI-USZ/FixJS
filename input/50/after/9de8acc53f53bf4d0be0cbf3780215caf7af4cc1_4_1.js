function() {
        try {
          return cont();
        } catch (err) {
          return console.log("ERROR PRINTING VALUE: " + err.stack);
        }
      }