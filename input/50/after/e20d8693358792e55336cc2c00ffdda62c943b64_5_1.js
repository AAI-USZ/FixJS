function(arr) {
      var randOrd;
      randOrd = function() {
        return Math.round(Math.random()) - 0.5;
      };
      return arr.slice(0).sort(randOrd);
    }