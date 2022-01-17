function() {
      var args, context, task, _task;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      ++this.total;
      if (args.length === 2) {
        context = args[0];
        _task = args[1];
        task = function(complete) {
          return balUtilFlow.fireWithOptionalCallback(_task, [complete], context);
        };
      } else {
        task = args[0];
      }
      this.queue.push(task);
      return this;
    }