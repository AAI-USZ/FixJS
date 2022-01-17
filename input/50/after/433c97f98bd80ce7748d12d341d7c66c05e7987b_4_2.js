function(worker) {
    lastWorker = worker;
    if (ready) worker.postMessage(JSON.stringify(ss.storage.h));
  }