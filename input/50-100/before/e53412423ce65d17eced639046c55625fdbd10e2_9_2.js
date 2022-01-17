function(err, badAddrs) {
      if (err)
        eLazy.error(err);
      else
        eLazy.event('sent');
    }