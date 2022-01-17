function (evt, elem) {
    var r;
    if (elem.getBoundingClientRect) {
      var er = elem.getBoundingClientRect();
      var dr = document.body.getBoundingClientRect();
      r = { left: er.left - dr.left, top: er.top - dr.top };
    } else {
      r = { left: elem.offsetLeft, top: elem.offsetTop }
      while (elem = elem.parentNode) {
        if (elem.offsetLeft || elem.offsetTop) {
          r.left += elem.offsetLeft;
          r.top += elem.offsetTop;
        }
      }
    }
    return [evt.m.pageX - r.left, evt.m.pageY - r.top];
  }