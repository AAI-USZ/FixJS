function () {
    assert.equal(Person.schema.path('keywords').casterConstructor.name,'SchemaString');
    var p = new Person;
    assert.equal(true, Array.isArray(p.keywords));
  }