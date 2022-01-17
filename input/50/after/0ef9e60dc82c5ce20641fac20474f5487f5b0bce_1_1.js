function(err) {
        var msg = 'Worker started. Admin UI on HTTP port ' + CONF.port_www;
        CONF.log.info(msg)
        $done(err)
      }