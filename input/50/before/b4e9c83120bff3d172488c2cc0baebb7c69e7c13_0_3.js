function _setTemplates(tmpl, view) {
    // set the template contents
    view.$el.html(tmpl());
    // inject modal template for contact information responses
    var contactModalTempl = app.fetchTemplate("app/templates/_contact-model");
    $(view.el).append(contactModalTempl);
  }