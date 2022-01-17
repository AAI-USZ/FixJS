function(n, shortened) {
      var multiplers = shortened ? ["", "k", "m", "b"] : ["", "thousand", "million", "billion"];
      var e = 0;
      var positive = parseInt(n, 10) >= 0;
      n = Math.abs(n)
      while (n >= 1000) { n = n / 1000; e++; }
      return {
        value: parseInt(n, 10), 
        unit: multiplers[e] || "", 
        sign: positive ? "" : "-"
      };
    }