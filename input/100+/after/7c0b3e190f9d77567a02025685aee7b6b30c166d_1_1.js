function (e, selector, el) {
    var event = e || window.event;
    var target = el || event.target || event.srcElement;
    if (target == null || target == document.body || target.tagName == 'HTML') return null;
    var condition = (selector.match(/^\./)) ? this.hasClassName(target,selector.replace(/^\./,'')) : (target.tagName.toLowerCase() == selector.toLowerCase());
    if (condition) {
      return target;
    } else {
      return this.findElement(e, selector, target.parentNode);
    }
  }