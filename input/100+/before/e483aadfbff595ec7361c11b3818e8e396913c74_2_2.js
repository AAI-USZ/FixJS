function $(selector, context){
    if (!selector) return Z();
    if (context !== undefined) return $(context).find(selector);
    else if (isF(selector)) return $(document).ready(selector);
    else if (selector instanceof Z) return selector;
    else {
      var dom;
      if (isA(selector)) dom = compact(selector);
      else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
        dom = [selector], selector = null;
      else if (fragmentRE.test(selector))
        dom = fragment(selector.trim(), RegExp.$1), selector = null;
      else if (selector.nodeType && selector.nodeType == 3) dom = [selector];
      else dom = $$(document, selector);
      return Z(dom, selector);
    }
  }