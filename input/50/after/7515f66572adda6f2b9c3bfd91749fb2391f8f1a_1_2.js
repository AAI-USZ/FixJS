function (topic) {
        Object.keys(topic).forEach(function (key) {
          assert.deepEqual(topic[key], nconf.get(key));
        });
      }