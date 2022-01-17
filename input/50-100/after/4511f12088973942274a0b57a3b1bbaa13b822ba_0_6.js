function getElementPosition(el) {
  var el = el[0];
  var top = 0;
  var left = 0;
  while (el) {
    if (el.offsetTop) {
      top += el.offsetTop;
    }
    if (el.offsetLeft) {
      left += el.offsetLeft;
    }
    el = el.offsetParent;
  }
  return {top: top, left: left};
}