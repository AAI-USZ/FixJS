function (code) {
        try {
          evaluate(code)(vfs, onEvaluate);
        } catch(err) {
          console.error(err.stack);
          api.emit("error", err);
          return;
        }
        api.emit("ready");
      }