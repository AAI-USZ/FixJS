function createJob(found, $_done) {
      console.log('found: ', found)
      if (found)
        console.log('REMOVED OLD JOB ' + envelope.id);

      var msg = '  creating job #'+envelope.id+' '+ envelope.jobData.title + '...';
      CONF.log.info(msg)
      $_done(null, JOBS.create(envelope.jobType, envelope.jobData))
    }