function() {
    var counter = 0;
    var e = new Backbone.Model({id: 10, label : 'e'});
    e.bind('add', function(model, collection) {
      counter++;
      equals(e, model);
      if (counter > 1) {
        equals(collection, colF);
      } else {
        equals(collection, colE);
      }
    });
    var colE = new Backbone.Collection([]);
    colE.bind('add', function(model, collection) {
      equals(e, model);
      equals(colE, collection);
    });
    var colF = new Backbone.Collection([]);
    colF.bind('add', function(model, collection) {
      equals(e, model);
      equals(colF, collection);
    });
    colE.add(e);
    equals(e.collection, colE);
    colF.add(e);
    equals(e.collection, colE);
  }