function() {
    var counter = 0;
    var dj = new Backbone.Model();
    var emcees = new Backbone.Collection([dj]);
    emcees.bind('change', function(){ counter++; });
    dj.set({name : 'Kool'});
    equals(counter, 1);
    emcees.reset([]);
    equals(dj.collection, undefined);
    dj.set({name : 'Shadow'});
    equals(counter, 1);
  }