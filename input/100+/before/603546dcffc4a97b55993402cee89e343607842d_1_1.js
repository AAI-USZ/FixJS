function() {
  view = Ember.View.create({
    template: Ember.Handlebars.compile('{{#each images}}<img {{bindAttr src="this"}}>{{/each}}'),
    images: Ember.A(['one.png', 'two.jpg', 'three.gif'])
  });

  appendView();

  var images = view.$('img');
  ok(/one\.png$/.test(images[0].src));
  ok(/two\.jpg$/.test(images[1].src));
  ok(/three\.gif$/.test(images[2].src));
}