function (err, res) {
      if (err) log.error('highlighter',  err); else log.info(res.length);
      stop();
    }