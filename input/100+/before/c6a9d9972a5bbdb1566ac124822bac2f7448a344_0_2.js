function killtree(child, signal){
    signal = signal || "SIGTERM";
    var pid = child.pid;

    childrenOfPid(pid, function(err, pidlist){
      if (err) {
        console.error(err);
        return;
      }

      pidlist.forEach(function (pid) {
        try {
          process.kill(pid, signal);
        } catch(e) {
          // kill may throw if the pid does not exist.
        }
      });
    });
  }