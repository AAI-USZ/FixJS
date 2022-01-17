function(params) {
  if (params.name === "syncAssistant") {
    if (params.accountId) {
      if (syncingAccountIds[params.accountId] && syncingAccountIds[params.accountId].syncing === true) {
        log("Already syncing account " + params.accountId + ". Please wait until that is finished.");
        syncingAccountIds[params.accountId].outerFuture = params.outerFuture;
        return false;
      } else {
        log("Locking account " + params.accountId + " to prevent multiple syncs.");
        syncingAccountIds[params.accountId] = {syncing: true, outerFuture: params.outerFuture};
        return true;
      }
    }
  } else {
    if (params.name === "onDeleteAssistant" ||
        params.name === "onCreateAssistant" ||
        params.name === "onEnabledAssistant") {
      if (locked === true) {
        log("Already doing account operation, waiting until it's finished.");
        previousOperationFuture.then(this, function (f) {
          log("PreviousOperation finished " + JSON.stringify(f.result) + " , starting " + params.name);
          params.run(params.outerFuture);
        });
        return false;
      }
      else {
        locked = true;
      }
    }
  }
  return true;
}