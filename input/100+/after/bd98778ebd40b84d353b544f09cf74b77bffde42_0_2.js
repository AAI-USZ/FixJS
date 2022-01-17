function(item, span) {
  if (!this.columns) return;
  var width = item.width;
  var height = item.height
  var ratio = width / height;
  var rating = item.rating || 0;
  var bento = item.bento;
  var ratingWeight = this.ratingWeight;
  var visibilityWeight = this.visibilityWeight;
  var distanceWeight = this.distanceWeight;
  var holeFillWeight = this.holeFillWeight;
  var holeDistanceWeight = this.holeDistanceWeight;
  var size = 0;
  if (item.seed == null) item.seed = Math.random();
  // Check against all registered patterns and collect modifiers
  if (this.patterns) for (var property in this.patterns) {
    var pattern = this.patterns[property];
    if (pattern) {
      if (pattern.ratio == null || (pattern.ratio[0] <= ratio && ratio <= pattern.ratio[1]))
      if (pattern.probability == null || (item.seed <= pattern.probability))
      if (pattern.rating == null || (pattern.rating[0] <= rating && rating <= pattern.rating[1])) {
        if (pattern.size != null) 
          size = pattern.size;
        if (pattern.span != null && span == null)
          span = pattern.span;
        if (pattern.ratingWeight != null)
          ratingWeight = pattern.ratingWeight;
        if (pattern.visibilityWeight != null)
          visibilityWeight = pattern.visibilityWeight;
        if (pattern.distanceWeight != null)
          distanceWeight = pattern.distanceWeight;
        if (pattern.holeFillWeight != null)
          holeFillWeight = pattern.holeFillWeight;
        if (pattern.holeDistanceWeight != null)
          holeDistanceWeight = pattern.holeDistanceWeight;
      }
    }
  }
  if (span == null) span = 1;
  // Calculate columns with min and max heights
  for (var i = 0, min, max, column; column = this.columns[i++];) {
    if (!min || min.height > column.height) min = column;
    if (!max || max.height < column.height) max = column;
  }
  var bestHoleScore = 0;
  var intermediate = 0;
  for (var i = 0, match, reversed, direction; column = this.columns[i]; i++) {
    var fullWidth = column.width;
    if (span > 1) {
      // try spanning to the right
      if (i + span - 1 <= this.columns.length) {
        for (var j = i + 1, k = i + Math.ceil(span); j < k; j++) {
          var next = this.columns[j];
          if (!next || next.height > column.height)
            break;
          else fullWidth += next.width;
        }
        if (j == k && fullWidth <= width) reversed = false;
      }
      // try spanning to the left
      if (reversed == null && i - span + 1 > -1) {
        fullWidth = column.width;
        for (var j = i - 1, k = i - Math.ceil(span); j > k; j--) {
          var previous = this.columns[j];
          if (!previous || previous.height > column.height)
            break;
          else fullWidth += previous.width;
        }
        if (j == k  && fullWidth <= width) reversed = true;
      }
      if (reversed == null) continue;
    }
    var ratio = item.width / item.height;
    
    // Find out hole that an item may fill
    if (column.holes) for (var l = 0, hole, bestHole, bestHoleWidth; hole = column.holes[l++];) {
      var holeFill = (hole[1] * ratio) / column.width;
      if (holeFill > 1) holeFill = 1 / holeFill;
      if (holeFill <= 0.5) holeFill = 1;
      var holeDistance = Math.max(1 - hole[0] / (max.height || 1), 0)
      var holeScore = (holeFill * holeFillWeight + holeDistance * holeDistanceWeight) / 2;
      if (holeScore > bestHoleScore) {
        bestHoleScore = holeScore;
        bestHole = hole;
      }
    }
    
    if (!column.maxHeight) {
    // Find out a column where an item fits best
    var above      = max.height - column.height;
    var below      = max.height - min.height;
    var distance   = max.height ? below ? 1 - (column.height - min.height) / below : 1 : 1
    var visibility = max.height ? above ? above >= height ? 1 : above / height : 1 : 1
    var wideness   = Math.min(ratio * (fullWidth / min.width), 4) / 4;
    var score      = (rating    * ratingWeight
                   + visibility * visibilityWeight
                   + distance   * distanceWeight
                   + wideness   * size) / 4;
    if (intermediate < score) {
      intermediate = score;
      match = column;
      direction = reversed;
    }  
    reversed = null;
  }
  }
  if (span > 1 && direction == null) return this.getPosition(item, 1);
  
  // Fill a hole, if it's score higher than the best column score
  if (span == 1 && (bestHoleScore >= score || score == null))
    return bestHole;

  // Collect columns affected by spanning
  if (span > 1 && match) {
    var matches = [match];
    if (!direction) {
      for (var j = this.columns.indexOf(match) + 1, k = j + Math.ceil(span) - 1; j < k; j++)
        matches.push(this.columns[j])
    } else {
      for (var j = this.columns.indexOf(match) - 1, k = j - Math.ceil(span) + 1; j > k; j--) 
        matches.push(this.columns[j])
    }
    return matches;
  }
  return match;
}