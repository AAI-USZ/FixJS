function() {
    setup(function() {
      utils.loadDumpFile(database, __dirname + '/fixture/companies/ddl.grn');
      utils.loadDumpFile(database, __dirname + '/fixture/companies/data.grn');
    });

    testSearch('/2011-02-01/search?q=Hongo',
               'search-companies-00000000000000000000000000.localhost',
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
                name: ['ClearCode Inc.'],
                age: [3],
                product: ['groonga']
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
    );

    testSearch('/2011-02-01/search?q=Tokyo',
               'search-companies-00000000000000000000000000.localhost',
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
    );

    testSearch('/2011-02-01/search?q=Tokyo&size=2',
               'search-companies-00000000000000000000000000.localhost',
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
    );

    testSearch('/2011-02-01/search?q=Tokyo&start=1',
               'search-companies-00000000000000000000000000.localhost',
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
    );
  }