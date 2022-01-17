function() {
  var triggered = false;
  var main = new Backbone.Layout({
    el: "#prefilled"
  });

  main.setViews({
    ".test": new this.SubView({
      serialize: { text: "Here" },

      afterRender: function() {
        triggered = true;
      }
    })
  });

  main.render().then(function() {
    ok(triggered === true, "afterRender is called");
     
    start();
  });
}