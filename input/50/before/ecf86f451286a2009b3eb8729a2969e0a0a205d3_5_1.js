function(object) {
    if (typeof object == 'string') object = this.getByURL(object);
    if (object) object.invalidate();
  }