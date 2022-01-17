function(obj) {
        filtered.push(whitelistFilter(obj, [
          'event_stream',
          'lang',
          'screen_size',
          'sample_rate',
          'timestamp'
        ]));
      }