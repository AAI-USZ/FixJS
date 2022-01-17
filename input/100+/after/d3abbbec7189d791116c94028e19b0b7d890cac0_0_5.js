function() {
    var modelData = {
      id : 5,
      title : 'Othello'
    };
    var passed = false;
    var e = new Backbone.Model(modelData);
    var f = new Backbone.Model(modelData);
    f.bind('remove', function() {
      passed = true;
    });
    var colE = new Backbone.Collection([e]);
    var colF = new Backbone.Collection([f]);
    ok(e != f);
    ok(colE.length == 1);
    ok(colF.length == 1);
    colE.remove(e);
    equal(passed, false);
    ok(colE.length == 0);
    colF.remove(e);
    ok(colF.length == 0);
    equal(passed, true);
  }