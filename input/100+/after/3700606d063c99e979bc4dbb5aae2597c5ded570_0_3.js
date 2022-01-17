function(response, body, done) {
      var actual = JSON.parse(body);
      assert.operator(actual.info['time-ms'], '>=', 0, 'time-ms is ok');
      actual.info['time-ms'] = 0; // always set 0 for test
      var expected = {
        rank: '-text_relevance',
        'match-expr': '',
        hits: {
          found: 3,
          start: 0,
          hit: [
            {
              id: 'id1',
              data: {
                _id: [1],
                _key: ['id1'],
                address: ['Shibuya, Tokyo, Japan'],
                description: [''],
                email_address: ['info@razil.jp'],
                name: ['Brazil'],
                age: [1],
                product: ['groonga']
              }
            },
            {
              id: 'id3',
              data: {
                _id: [3],
                _key: ['id3'],
                address: ['Hongo, Tokyo, Japan'],
                description: [''],
                email_address: ['info@clear-code.com'],
                name: ['ClearCode Inc.'],
                age: [3],
                product: ['groonga']
              }
            }
          ]
        },
        info: {
          rid: '000000000000000000000000000000000000000000000000000000000000000',
          'time-ms': 0, // always 0
          'cpu-time-ms': 0
        }
      };
      assert.deepEqual(actual, expected);
      done();
    }