function() {
    attrs = {id: 'id', foo: 1, bar: 2, baz: 3};
    a = new Backbone.Model(attrs);
    var changeCount = 0;
    a.bind("change:foo", function() { changeCount += 1; });
    a.set({'foo': 2});
    ok(a.get('foo')== 2, "Foo should have changed.");
    ok(changeCount == 1, "Change count should have incremented.");
    a.set({'foo': 2}); // set with value that is not new shouldn't fire change event
    ok(a.get('foo')== 2, "Foo should NOT have changed, still 2");
    ok(changeCount == 1, "Change count should NOT have incremented.");

    a.unset('foo');
    ok(a.get('foo')== null, "Foo should have changed");
    ok(changeCount == 2, "Change count should have incremented for unset.");

    a.unset('id');
    equal(a.id, undefined, "Unsetting the id should remove the id property.");
  }