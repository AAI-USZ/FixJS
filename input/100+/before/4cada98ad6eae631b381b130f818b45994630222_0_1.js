function(match, _, pre, num) {
      pre = pre || '';
      return pre + '(0-' + num + ')';
    }