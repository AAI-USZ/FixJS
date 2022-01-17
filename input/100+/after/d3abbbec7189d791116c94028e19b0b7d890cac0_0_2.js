function() {
    var added = opts = secondAdded = null;
    e = new Backbone.Model({id: 10, label : 'e'});
    otherCol.add(e);
    otherCol.bind('add', function() {
      secondAdded = true;
    });
    col.bind('add', function(model, collection, options){
      added = model.get('label');
      opts = options;
    });
    col.add(e, {amazing: true});
    equal(added, 'e');
    equal(col.length, 5);
    equal(col.last(), e);
    equal(otherCol.length, 1);
    equal(secondAdded, null);
    ok(opts.amazing);

    var f = new Backbone.Model({id: 20, label : 'f'});
    var g = new Backbone.Model({id: 21, label : 'g'});
    var h = new Backbone.Model({id: 22, label : 'h'});
    var atCol = new Backbone.Collection([f, g, h]);
    equal(atCol.length, 3);
    atCol.add(e, {at: 1});
    equal(atCol.length, 4);
    equal(atCol.at(1), e);
    equal(atCol.last(), h);
  }