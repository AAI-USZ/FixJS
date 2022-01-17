function shuffle(n) {
    var shuffled = [];
    for (i = 0; i < n; i++)
      shuffled.splice(parseInt((i + 1) * Math.random()), 0, i);
    return shuffled;
  }