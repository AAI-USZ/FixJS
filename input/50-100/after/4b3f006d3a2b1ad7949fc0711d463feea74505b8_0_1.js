function() {
    var content = get(this, 'content'),
        len     = content ? get(content, 'length') : 0;

    Ember.assert("Can't set ArrayProxy's content to itself", content !== this);

    if (content) {
      content.addArrayObserver(this, {
        willChange: 'contentArrayWillChange',
        didChange: 'contentArrayDidChange'
      });
    }
  }