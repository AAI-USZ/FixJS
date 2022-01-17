function() {
  view = Ember.View.create({
    template: Ember.Handlebars.compile('{{#each items}}<li {{bindAttr class="this"}}>Item</li>{{/each}}'),
    items: Ember.A(['a', 'b', 'c'])
  });

  appendView();

  ok(view.$('li').eq(0).hasClass('a'), "sets classname to the value of the first item");
  ok(view.$('li').eq(1).hasClass('b'), "sets classname to the value of the second item");
  ok(view.$('li').eq(2).hasClass('c'), "sets classname to the value of the third item");
}