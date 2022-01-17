function() {
    var e = new Backbone.Model({title: 'Othello'});
    e.sync = function(method, model, options) { throw "should not be called"; };
    var colE = new Backbone.Collection([e]);
    var colF = new Backbone.Collection([e]);
    e.destroy();
    ok(colE.length == 0);
    ok(colF.length == 0);
    equal(null, e.collection);
  }