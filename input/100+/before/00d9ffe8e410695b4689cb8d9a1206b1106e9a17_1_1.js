function(test) {
    radius.load_dictionary('dictionaries/dictionary.test1');

    var decoded = radius.decode({
      secret: secret,
      packet: radius.encode({
        secret: secret,
        code: 'Access-Request',
        attributes: [['Attribute-Test1', 'foo'], ['Attribute-Test2', 'bar']]
      })
    });

    var expected_attrs = {
      'Attribute-Test1': 'foo',
      'Attribute-Test2': 'bar'
    };
    test.deepEqual( expected_attrs, decoded.attributes );

    test.done();
  }