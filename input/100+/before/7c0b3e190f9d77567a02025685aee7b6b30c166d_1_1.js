function (e,selector,el) {
    var event = e || window.event;
    var target = el || event.target || event.srcElement;
    if(target == document.body) return null;
    var condition = (selector.match(/^\./)) ? this.hasClassName(target,selector.replace(/^\./,'')) : (target.tagName.toLowerCase() == selector.toLowerCase());
    if(condition) {
      return target;
    } else {
      return this.findElement(e,selector,target.parentNode);
    }
  }