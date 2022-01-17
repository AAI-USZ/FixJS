function (key, value) {
    var content = get(this, 'content');
    if (!content) {
      throw new Error('Unable to delegate set without content for property: ' + key);
    }
    return set(content, key, value);
  }