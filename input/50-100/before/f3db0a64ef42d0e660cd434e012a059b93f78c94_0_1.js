function findSpecName(specId, suites) {
    for (var i in suites) {
      if (suites[i].id == specId) {
        return suites[i].name;
      }

      var name = findSpecName(specId, suites[i].children);

      if (name) { return suites[i].name + ' ' + name };
    }
  }