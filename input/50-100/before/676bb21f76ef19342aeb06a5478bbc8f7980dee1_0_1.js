function(err, success) {
          if (!err) {
            CONF.log.info('Removing old job ' + envelope.id);
          } else {
            CONF.log.error('Could not remove old job ' + envelope.id);
          }
        }