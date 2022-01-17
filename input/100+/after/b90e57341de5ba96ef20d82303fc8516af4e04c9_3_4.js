function() {
  var setup = this;

  var m = new Backbone.Model();

  var View = Backbone.View.extend({
    manage: true,

    initialize: function() {
      this.model.on("change", function() {
        this.render();
      }, this);
    },

    beforeRender: function() {
      this.insertView(new setup.View({
        msg: "insert",

        // Need keep true.
        keep: true
      }));
    }
  });

  var view = new View({ model: m });

  var layout = new Backbone.Layout({
    template: "#main",

    views: {
      ".left": view
    }
  });

  m.set("some", "change");

  layout.render().then(function(el) {
    equal(this.$(".inner-left").length, 2, "rendered twice");
  });
}