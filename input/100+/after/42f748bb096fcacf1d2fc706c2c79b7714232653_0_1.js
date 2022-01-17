function(err, hash){
    if (err) return fn(err);
    if (!hash) return fn(new Error('job "' + job.id + '" doesnt exist'));
    if (!hash.type) return fn();
    // TODO: really lame, change some methods so 
    // we can just merge these
    job.type = hash.type;
    job._delay = hash.delay;
    job.priority(Number(hash.priority));
    job._progress = hash.progress;
    job._attempts = hash.attempts;
    job._max_attempts = hash.max_attempts;
    job._state = hash.state;
    job._error = hash.error;
    job.created_at = hash.created_at;
    job.updated_at = hash.updated_at;
    job.failed_at = hash.failed_at;
    job.duration = hash.duration;
    try {
      if (hash.data) job.data = JSON.parse(hash.data);
      fn(err, job);
    } catch (err) {
      fn(err);
    }
  }