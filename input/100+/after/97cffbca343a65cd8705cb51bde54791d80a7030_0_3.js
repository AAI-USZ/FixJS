function () {
    var list = [], listIndex = 0, displayIndex = 1;
    for (listIndex=0; listIndex < self.scenarioList().length; listIndex++) {
      if (listIndex % self.listDisplayCount === 0 && Math.abs(listIndex - self.listStart()) < 5 * self.listDisplayCount) {
        list.push({'displayIndex': 1 + (listIndex/self.listDisplayCount), 'listIndex': listIndex });
      }
    }
    if (list.length < self.scenarioList().length / self.listDisplayCount) {
      list.push({'displayIndex': '...', 'listIndex': null });
      list.push({'displayIndex': '»', 'listIndex': null });

    }
    if (self.listStart() > self.listDisplayCount) {
      list.shift({'displayIndex': '&laquo;', 'listIndex': null });      
    }
    return list;
  }