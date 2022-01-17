function() {
    var target = {};
    var retval = helpers.extend(target, {
      field1: true,
      field2: "value"
    });

    equal(target.field1, true, "target extended");
    equal(target.field2, "value", "target extended");

    strictEqual(retval, target, "the updated target is returned");
  }