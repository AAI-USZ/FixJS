function createJob(found, $_done) {
      if (found) {
        removeExisting(envelope.jobType, envelope.id, function(err, success) {
          if (!err) {
            CONF.log.info('Removing old job ' + envelope.id);
          } else {
            CONF.log.error('Could not remove old job ' + envelope.id);
          }
        })
      }

      var msg = '  creating job '+envelope.id+' '+ envelope.jobData.title + '...';
      CONF.log.info(msg)
      $_done(null, JOBS.create(envelope.jobType, envelope.jobData))
    }