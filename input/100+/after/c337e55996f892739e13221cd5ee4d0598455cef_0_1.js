function(prev, curr, idx, arr) {
    var str = extract(curr);
    var rendered = fuzzy.templatize(pattern, str, template);
    if(rendered != null) {
      prev[prev.length] = {string: rendered, index: idx, original: curr};
    }
    return prev;
  }