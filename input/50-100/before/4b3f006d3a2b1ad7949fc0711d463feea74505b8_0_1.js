function() {
    var content = get(this, 'content'),
        len     = content ? get(content, 'length') : 0;

    if (content) {
      content.addArrayObserver(this, {
        willChange: 'contentArrayWillChange',
        didChange: 'contentArrayDidChange'
      });
    }
  }