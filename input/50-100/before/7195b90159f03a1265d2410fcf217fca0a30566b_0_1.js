function (code) {
        try {
          functions = evaluate(code)(vfs, onEvaluate);
        } catch(err) {
          console.error(err.stack);
          api.emit("error", err);
          return;
        }
        api.emit("ready");
      }