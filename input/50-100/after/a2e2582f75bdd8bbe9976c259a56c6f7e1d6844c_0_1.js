function() {
    var scoresToCalculate = [];
    var ratings           = this.get('ratings');

    for (var i = 0; i < ratings.length; i++) {
      if (ratings[i].ignored === false || ratings[i].ignored === undefined) {
        if (ratings[i].score !== 0.0) {
          scoresToCalculate.push(ratings[i].score);
        }
      }
    }
    return scoresToCalculate;
  }