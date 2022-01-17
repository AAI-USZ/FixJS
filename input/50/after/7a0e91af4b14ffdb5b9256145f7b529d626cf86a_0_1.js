function transportDocError(data) {
        this.workerReadyPromise.reject(data);
      }