function() {
    var batches = addBatches.slice(0, 2).concat(deleteBatches.slice(0, 1));
    var expected = [
          {
            command: 'load',
            options: {
              table: 'test',
              values: JSON.stringify([{
                '_key': batches[0]['id'],
                'name': batches[0]['fields']['name'],
                'address': batches[0]['fields']['address'],
                'email_address': batches[0]['fields']['email_address'],
                'age': batches[0]['fields']['age'],
                'product': batches[0]['fields']['product']
              }])
            }
          },
          {
            command: 'load',
            options: {
              table: 'test',
              values: JSON.stringify([{
                '_key': batches[1]['id'],
                'name': batches[1]['fields']['name'],
                'address': batches[1]['fields']['address'],
                'email_address': batches[1]['fields']['email_address'],
                'age': batches[1]['fields']['age'],
                'product': batches[1]['fields']['product']
              }])
            }
          },
          {
            command: 'delete',
            options: {
              table: 'test',
              key: batches[2]['id']
            }
          }
        ];
    var translated = translator.translate(batches);
    assert.deepEqual(translated, expected);
  }