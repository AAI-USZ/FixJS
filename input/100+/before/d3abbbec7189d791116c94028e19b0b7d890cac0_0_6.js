function() {
    var counter = 0;
    var e = new Backbone.Model({id: 5, title: 'Othello'});
    e.bind('remove', function(model, collection) {
      counter++;
      equals(e, model);
      if (counter > 1) {
        equals(collection, colE);
      } else {
        equals(collection, colF);
      }
    });
    var colE = new Backbone.Collection([e]);
    colE.bind('remove', function(model, collection) {
      equals(e, model);
      equals(colE, collection);
    });
    var colF = new Backbone.Collection([e]);
    colF.bind('remove', function(model, collection) {
      equals(e, model);
      equals(colF, collection);
    });
    equals(colE, e.collection);
    colF.remove(e);
    ok(colF.length == 0);
    ok(colE.length == 1);
    equals(counter, 1);
    equals(colE, e.collection);
    colE.remove(e);
    equals(null, e.collection);
    ok(colE.length == 0);
    equals(counter, 2);
  }