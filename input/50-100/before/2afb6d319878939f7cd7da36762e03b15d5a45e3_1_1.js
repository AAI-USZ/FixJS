function() {
            if (sandboxRoot._error) return;
            try {
              callback.apply(sandboxRoot._this, arguments);
              events.emit('finishCallback');  
            } catch (err) {
              sandbox._error = err;
              done(err);
            }
          }