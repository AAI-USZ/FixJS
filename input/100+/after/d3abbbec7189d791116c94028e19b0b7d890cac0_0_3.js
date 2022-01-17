function() {
    var counter = 0;
    var e = new Backbone.Model({id: 10, label : 'e'});
    e.bind('add', function(model, collection) {
      counter++;
      equal(e, model);
      if (counter > 1) {
        equal(collection, colF);
      } else {
        equal(collection, colE);
      }
    });
    var colE = new Backbone.Collection([]);
    colE.bind('add', function(model, collection) {
      equal(e, model);
      equal(colE, collection);
    });
    var colF = new Backbone.Collection([]);
    colF.bind('add', function(model, collection) {
      equal(e, model);
      equal(colF, collection);
    });
    colE.add(e);
    equal(e.collection, colE);
    colF.add(e);
    equal(e.collection, colE);
  }