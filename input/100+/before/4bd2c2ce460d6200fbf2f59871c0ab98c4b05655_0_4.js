function() {
          var complete;
          ++me.running;
          complete = me.completer();
          return balUtilFlow.fireWithOptionalCallback(task, [complete]);
        }