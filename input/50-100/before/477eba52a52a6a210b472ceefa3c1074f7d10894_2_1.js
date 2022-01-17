function (msg, data) {
        if (hasTimedOut) return;
        var line = self.set('log', { message: msg });
        if (data) line.set('data', data);
        line.set('timestamp', new Date().getTime());
        line.set('job', job);
        debug('task %s log: %s', msg);
        task.emit('log', job, line);
      }