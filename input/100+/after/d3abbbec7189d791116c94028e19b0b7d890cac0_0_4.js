function() {
    var counter = 0;
    var dj = new Backbone.Model();
    var emcees = new Backbone.Collection([dj]);
    emcees.bind('change', function(){ counter++; });
    dj.set({name : 'Kool'});
    equal(counter, 1);
    emcees.reset([]);
    equal(dj.collection, undefined);
    dj.set({name : 'Shadow'});
    equal(counter, 1);
  }