function() {
    var batch = addBatches[0];
    var expected = {
          command: 'load',
          options: {
            table: 'test',
            values: JSON.stringify([{
              '_key': batch['id'],
              'name': batch['fields']['name'],
              'address': batch['fields']['address'],
              'email_address': batch['fields']['email_address'],
              'age': batch['fields']['age'],
              'product': batch['fields']['product']
            }])
          }
        };
    var translated = translator.addToLoad(batch);
    assert.deepEqual(translated, expected);
  }