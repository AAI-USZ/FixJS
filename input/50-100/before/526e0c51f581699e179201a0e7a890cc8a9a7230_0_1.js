function() {
    var templateData = get(this, 'templateData'),
        controller = get(this, 'controller');

    var keywords = templateData ? Ember.copy(templateData.keywords) : {};
    keywords.view = get(this, 'concreteView');

    // If the view has a controller specified, make it available to the
    // template. If not, pass along the parent template's controller,
    // if it exists.
    if (controller) {
      keywords.controller = controller;
    }

    return keywords;
  }