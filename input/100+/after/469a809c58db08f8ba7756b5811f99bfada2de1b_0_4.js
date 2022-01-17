function(boxes, axis) {
  var dH, dW, i, newbox, newboxes, sarea, skipNext, tarea, _i, _ref, _ref1, _ref2;
  boxes = boxes.sort(function(a, b) {
    return a[axis] - b[axis];
  });
  newboxes = [];
  skipNext = false;
  if (boxes.length > 0) {
    for (i = _i = 0, _ref = boxes.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      _ref1 = boxAreas(boxes[i], boxes[i + 1]), sarea = _ref1[0], tarea = _ref1[1], newbox = _ref1[2], (_ref2 = _ref1[3], dW = _ref2[0], dH = _ref2[1]);
      if ((sarea - tarea < 256 || (sarea * 0.5 <= tarea && dW < 20 && dH < 20)) && !skipNext) {
        newboxes.push(newbox);
        skipNext = true;
      } else {
        if (!skipNext) {
          newboxes.push(boxes[i]);
        }
        skipNext = false;
      }
    }
    if (!skipNext) {
      newboxes.push(boxes[boxes.length - 1]);
    }
  }
  return newboxes;
}