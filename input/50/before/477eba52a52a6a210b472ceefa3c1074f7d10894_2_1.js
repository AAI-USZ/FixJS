function (curr, total) {
        if (hasTimedOut) return;
        debug('task %s at progress %n/%n', curr, total);
        task.emit('progress', job, curr, total);
      }