function() {
  var triggered = false;
  var main = new Backbone.Layout({
    el: "#prefilled"
  });

  main.setViews({
    ".test": new this.SubView({
      render: function(manage) {
        return manage(this).render({ text: "Here" }).then(function() {
          triggered = true;
        });
      }
    })
  });

  main.render(function(el) {
    ok(triggered == true, "Promise still exists on custom render");
     
    start();
  });
}