function(checked, conditions) {
    if (checked.length != conditions.length) return false;
    var len = conditions.length;
    var count = 0;
    _.each(checked, function(value) {
      if (conditions.indexOf(value) > -1) {
        count += 1;
      }
    });

    return (count == len);
  }