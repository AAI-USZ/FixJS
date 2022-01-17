function(response, body, done) {
      var actual = JSON.parse(body);
      assert.operator(actual.info['time-ms'], '>=', 0, 'time-ms is ok');
      actual.info['time-ms'] = 0; // always set 0 for test
      var expected = { // FIXME
        rank: '-text_relevance',
        'match-expr': '',
        hits: {
          found: 1,
          start: 0,
          hit: [{
            id: 'id3',
            data: {
              _id: [3],
              _key: ['id3'],
              address: ['Hongo, Tokyo, Japan'],
              description: [''],
              email_address: ['info@clear-code.com'],
              name: ['ClearCode Inc.']
            }
          }]
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