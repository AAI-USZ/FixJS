function(key, cb) {
        var blockingMock = {
          hello : "world",
          France: "Paris",
          Germany: "Berlin",
          UK: "London"
        };
        called = true;
        cb(null, blockingMock[key]);
      }