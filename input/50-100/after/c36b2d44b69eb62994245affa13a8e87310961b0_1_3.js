function(dp) {
      var groups, _ref4;
      groups = globals.groupSelection.map(function(index) {
        return data.groups[index];
      });
      return _ref4 = (String(dp[data.groupIndex])).toLowerCase(), __indexOf.call(groups, _ref4) >= 0;
    }