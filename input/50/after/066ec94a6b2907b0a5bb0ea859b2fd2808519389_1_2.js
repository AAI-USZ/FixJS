function () {
    assert.equal(Person.schema.path('_keywords').casterConstructor.name,'SchemaString');
    var p = new Person;
    assert.equal(true, Array.isArray(p._keywords));
  }