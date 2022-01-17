function createJob(found, $_done) {
      console.log('found: ', found)
      if (found)
        console.log('REMOVED OLD JOB ' + envelope.id);

      console.log('  creating job ' + envelope.jobData.title + '...')
      $_done(null, JOBS.create(envelope.jobType, envelope.jobData))
    }