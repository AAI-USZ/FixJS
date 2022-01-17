function autoRun(el, state) {
    var _ref;
    el.autorunState = state;
    return (_ref = el.autorun) != null ? _ref.checked = state : void 0;
  }