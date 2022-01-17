function(){
    var doc = new TestDocument();

    doc.init({
        test    : 'test'
      , oids    : []
      , em: [{title:'asdf'}]
      , nested  : {
            age   : 5
          , cool  : DocumentObjectId.fromString('4c6c2d6240ced95d0e00003c')
          , path  : 'my path'
        }
      , nested2: {}
    });

    var clone = doc.toObject({ getters: true, virtuals: false });

    assert.equal(clone.test, 'test');
    assert.ok(clone.oids instanceof Array);
    assert.equal(5, clone.nested.age);
    assert.equal(DocumentObjectId.toString(clone.nested.cool), '4c6c2d6240ced95d0e00003c');
    assert.equal('5my path', clone.nested.path);
    assert.equal(undefined, clone.nested.agePlus2);
    assert.equal(undefined, clone.em[0].works);

    clone = doc.toObject({ virtuals: true });

    assert.equal('test', clone.test);
    assert.ok(clone.oids instanceof Array);
    assert.equal(5, clone.nested.age);
    assert.equal(DocumentObjectId.toString(clone.nested.cool), '4c6c2d6240ced95d0e00003c');
    assert.equal('my path', clone.nested.path);
    assert.equal(7, clone.nested.agePlus2);
    assert.equal(clone.em[0].works, 'em virtual works');

    clone = doc.toObject({ getters: true });

    assert.equal('test', clone.test);
    assert.ok(clone.oids instanceof Array);
    assert.equal(5, clone.nested.age);
    assert.equal(DocumentObjectId.toString(clone.nested.cool),'4c6c2d6240ced95d0e00003c');
    assert.equal('5my path', clone.nested.path);
    assert.equal(7, clone.nested.agePlus2);
    assert.equal('em virtual works', clone.em[0].works);

    // test toObject options
    doc.schema.options.toObject = { virtuals: true };
    clone = doc.toObject();
    assert.equal('test', clone.test);
    assert.ok(clone.oids instanceof Array);
    assert.equal(5, clone.nested.age);
    assert.equal(DocumentObjectId.toString(clone.nested.cool),'4c6c2d6240ced95d0e00003c');

    assert.equal('my path', clone.nested.path);
    assert.equal(7, clone.nested.agePlus2);
    assert.equal('asdf', clone.em[0].title);
    delete doc.schema.options.toObject;

    // minimize
    clone = doc.toObject({ minimize: true });
    assert.equal(undefined, clone.nested2);
    clone = doc.toObject({ minimize: false });
    assert.equal('Object', clone.nested2.constructor.name);
    assert.equal(1, Object.keys(clone.nested2).length);
    clone = doc.toObject('2');
    assert.equal(undefined, clone.nested2);

    doc.schema.options.toObject = { minimize: false };
    clone = doc.toObject();
    assert.equal('Object', clone.nested2.constructor.name);
    assert.equal(1, Object.keys(clone.nested2).length);
    delete doc.schema.options.toObject;

    doc.schema.options.minimize = false;
    clone = doc.toObject();
    assert.equal('Object', clone.nested2.constructor.name);
    assert.equal(1, Object.keys(clone.nested2).length);
    doc.schema.options.minimize = true;
    clone = doc.toObject();
    assert.equal(undefined, clone.nested2);
  }