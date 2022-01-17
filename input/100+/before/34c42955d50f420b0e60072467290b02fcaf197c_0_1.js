function(selector, _roots, matchRoots) {
    var roots;
    roots = normalizeRoots(_roots);
    if (!selector) {
      return [];
    } else if (typeof selector === 'object' && isFinite(selector.length)) {
      return selector;
    } else if (tagPattern.test(selector)) {
      return create(selector, roots[0]);
    } else if (selector === window || selector === 'window') {
      return [window];
    } else if (selector === document || selector === 'document') {
      return [document];
    } else if (selector.nodeType === 1) {
      if (!_roots || roots.some(function(root) {
        return contains(root, selector);
      })) {
        return [selector];
      } else {
        return [];
      }
    } else {
      return select(selector, roots, matchRoots);
    }
  }