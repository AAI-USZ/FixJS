function (key) {
    var content = get(this, 'content');
    if (content) {
      return get(content, key);
    }
  }