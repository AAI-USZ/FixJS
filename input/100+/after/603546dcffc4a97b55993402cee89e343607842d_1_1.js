function() {
  TemplateTests.set('isOpen', true);

  view = Ember.View.create({
    template: Ember.Handlebars.compile('<img src="test.jpg" {{bindAttr class="TemplateTests.isOpen"}}>')
  });

  appendView();

  ok(view.$('img').hasClass('is-open'), "sets classname to the dasherized value of the global property");

  Ember.run(function() {
    TemplateTests.set('isOpen', false);
  });

  ok(!view.$('img').hasClass('is-open'), "removes the classname when the global property has changed");
}