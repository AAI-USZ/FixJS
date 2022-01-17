function(list, e) {
  // Code copied from goog.array.binarySearch_ - this is perf sensitive
  // and doing all the indirect calls and such was nasty
  var left = 0;
  var right = list.length;
  var found;
  while (left < right) {
    var middle = (left + right) >> 1;
    var compareResult = list[middle] - e.targetTime;
    if (compareResult > 0) {
      left = middle + 1;
    } else {
      right = middle;
      found = !compareResult;
    }
  }
  // left == targetIndex
  list.splice(left, 0, e);
}