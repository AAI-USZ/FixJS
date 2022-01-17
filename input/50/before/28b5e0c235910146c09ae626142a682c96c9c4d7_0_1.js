function (data) {
        if(!data.feeds.length && d) {
          // try to show something that has data
          location.hash = '?s=latest&p=1';
        } else {
          show_feeds(data, section);
          call_if_fn(cb);
        }
      }