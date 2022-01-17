function (err, data) {
          assert.isNull(err);
          data = JSON.parse(data);
          Object.keys(data).forEach(function (key) {
            assert.deepEqual(nconf.get(key), data[key]);
          });
          assert.equal(nconf.get('weebls'), 'crap');
        }