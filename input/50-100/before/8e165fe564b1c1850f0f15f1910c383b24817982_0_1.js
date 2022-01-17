function(elems) {
    var up, _ref;
    elems.removeAttr(editable).removeAttr('class');
    while (_ref = elems.text(), __indexOf.call(empty, _ref) >= 0) {
      up = elems.parent();
      elems.remove();
      elems = up;
    }
    click_choose(elems);
    return elems;
  }