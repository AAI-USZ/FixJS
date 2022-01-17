function() {
          var complete, _context, _task;
          ++me.running;
          complete = me.completer();
          if (balUtilFlow.isArray(task)) {
            if (task.length === 2) {
              _context = task[0];
              _task = task[1];
            } else if (task.length === 1) {
              _task = task[0];
              _context = null;
            } else {
              throw new Error('balUtilFlow.Group an invalid task was pushed');
            }
          } else {
            _task = task;
          }
          return balUtilFlow.fireWithOptionalCallback(_task, [complete], _context);
        }