function(err, pidlist){
      if (err) {
        console.error(err.stack);
        return;
      }

      pidlist.forEach(function (pid) {
        try {
          process.kill(pid, signal);
        } catch(e) {
          // kill may throw if the pid does not exist.
        }
      });
    }