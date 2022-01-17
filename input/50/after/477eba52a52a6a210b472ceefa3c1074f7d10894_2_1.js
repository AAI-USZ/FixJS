function (curr, total) {
        if (hasTimedOut) return;
        debug('task "%s" at progress %d/%d', task.get('name'), curr, total);
        task.emit('progress', job, curr, total);
      }