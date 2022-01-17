function(key, cb) {
        var blockingMock = {
          Switzerland : "Geneva",
          France: "Paris",
          Germany: "Berlin",
          UK: "London"
        };
        called = true;
        cb(null, blockingMock[key]);
      }