function(e) {
    var target, _ref;
    target = e.target || e.srcElement;
    if (target !== itembox && __indexOf.call(itembox.getElementsByTagName('ul'), target) < 0 && __indexOf.call(itembox.childNodes, target) < 0 && ((_ref = target.tagName) !== 'LI' && _ref !== 'A' && _ref !== 'INPUT')) {
      return itembox.style.display = 'none';
    }
  }