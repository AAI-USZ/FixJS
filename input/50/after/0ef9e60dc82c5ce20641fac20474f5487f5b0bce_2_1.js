function(err) {
      var msg = 'Removed job #' + kid;
      CONF.log.info(msg)
      $done(err)
    }