function autoLog () {
        switch (job.get('status')) {
          case 'completed':
            param.log('Job completed successfully');
            break;
          case 'failed':
            param.log('Job has failed: "' + job.get('error.msg') + '"');
            break;
          case 'timeout':
            param.log('Job has timed out after ' + timeout + 'ms');
            break;
          case 'processing':
            param.log('Job has started processing');
            break;
        }
      }