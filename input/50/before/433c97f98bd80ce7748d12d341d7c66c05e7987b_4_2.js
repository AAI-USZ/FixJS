function(worker) {
    lastWorker = worker;
    if (ready) worker.postMessage(ss.storage.h);
  }