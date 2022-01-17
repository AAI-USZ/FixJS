function() {
  var main = new Backbone.Layout({
    template: "#main"
  });

  var TestRender = Backbone.View.extend({
    manage: true,

    initialize: function() {
      this.model.on("change", this.render, this);
    },

    beforeRender: function() {
      this.$el.html("This works now!");
    }
  });

  var testModel = new Backbone.Model();

  main.setView(".right", new TestRender({
    model: testModel
  }));

  testModel.trigger("change");

  main.render().then(function(el) {
    equal(this.$(".right").children().html(), "This works now!",
      "Content correctly set");

    start();
  });
}