function (key, value) {
    var content = get(this, 'content');
    Ember.assert(fmt("Cannot delegate set('%@', %@) to the 'content' property of object proxy %@: its 'content' is undefined.", [key, value, this]), content);
    return set(content, key, value);
  }