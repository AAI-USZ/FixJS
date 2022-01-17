function(arr) {
      var randOrd;
      randOrd = function() {
        return Math.round(Math.random()) - 0.5;
      };
      return arr.splice(0).sort(randOrd);
    }