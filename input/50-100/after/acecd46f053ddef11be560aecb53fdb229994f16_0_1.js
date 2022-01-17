function() {
      expect(result.choice).toBeTruthy();
      expect(result.token).toBeTruthy();

      var suggestion = result;
      flag = false;
      result = false;
      suggestion.reward(
        1.0,
        function(ok) { flag = true; result = ok; },
        function(error) { flag = true; result = err; }
      )
    }