function(){
  view = Ember.View.create({
    template: Ember.Handlebars.compile(
      '<div id="first">{{unbound content.anUnboundString}}</div>'+
      '{{#with content}}<div id="second">{{unbound ../anotherUnboundString}}</div>{{/with}}'
    ),

    content: Ember.Object.create({
      anUnboundString: "No spans here, son."
    }),

    anotherUnboundString: "Not here, either."
  });

  appendView();

  equal(view.$('#first').html(), "No spans here, son.");
  equal(view.$('#second').html(), "Not here, either.");
}