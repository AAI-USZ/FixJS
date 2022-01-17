function(response, body, done) {
      var actual = JSON.parse(body);
      actual.info['time-ms'] = 0; // always set 0 for test
      var expected = {
        rank: '-text_relevance',
        'match-expr': '',
        hits: {
          found: 3,
          start: 1,
          hit: [
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
            },
            {
              id: 'id9',
              data: {
                _id: [9],
                _key: ['id9'],
                address: ['Tokyo, Japan'],
                description: [''],
                email_address: [''],
                name: ['Umbrella Corporation'],
                age: [9],
                product: ['tyrant']
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