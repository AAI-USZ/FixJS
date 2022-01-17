function(test) {
    radius.unload_dictionaries();
    radius.add_dictionary('dictionaries/dictionary.test1');

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

    // make sure it works with async loading too
    radius.unload_dictionaries();

    var encode_callback = function(err, encoded) {
      var decode_callback = function(err, decoded) {
        test.deepEqual( expected_attrs, decoded.attributes );

        test.done();
      };

      radius.decode({
        secret: secret,
        packet: encoded,
        callback: decode_callback
      });
    };
    radius.encode({
      secret: secret,
      code: 'Access-Request',
      attributes: [['Attribute-Test1', 'foo'], ['Attribute-Test2', 'bar']],
      callback: encode_callback
    });
  }