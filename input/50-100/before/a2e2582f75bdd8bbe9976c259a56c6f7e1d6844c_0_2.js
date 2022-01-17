function() {
    var scores         = this.getScoresToCalculate();
    var scoresSum      = 0;
    var combinedRating = 0;

    for (var i = 0; i < scores.length; i++) {
      scoresSum += scores[i];
    }
    if (scores.length > 0) {
      combinedRating = scoresSum / scores.length;
    }
    this.set('combined_rating', combinedRating);
  }