function (f) {
    if (f.result.finalResult) {
      //log("FINAL RESULT!!");
      log(oldMsg);
      //sync finished.
      if (f.result.success) {
        logStatus("Sync returned ok");
        if (f.result.account) {
          var es = f.result.account.datastores.calendar;
          if (es.deleteFromServerFail) {
            log("Deletes on client FAILED: " + es.deleteFromServerFail);
          }
          if (es.updateFromServerFail) {
            log("Updates on client FAILED: " + es.updateFromServerFail);
          }
          if (es.addFromServerFail) {
            log("Adds    on client FAILED: " + es.addFromServerFail);
          }
          log("Deletes on client: " + es.deleteFromServer);
          log("Updates on client: " + es.updateFromServer);
          log("Adds    on client: " + es.addFromServer);
          log("Deletes on server: " + es.delOwn);
          log("Updates on server: " + es.replaceOwn);
          log("Adds    on server: " + es.addOwn);
          log("Stats for calendar:");
        }
      } else {
        logStatus("Sync returned with error.");
      }
      this.controller.get("btnStart").mojo.deactivate();
      this.buttonModel.disabled = false;
      this.controller.modelChanged(this.buttonModel);
      this.locked = false;
      f.cancel();
      future.cancel();
    } else {
      f.then(this, getResult);
    }
    
    if (f.result.msg) {
      log(oldMsg);
      oldMsg = f.result.msg;
      logStatus(f.result.msg);
    }

    if (f.result.reason) {
      log(f.result.reason);
      logStatus(f.result.reason);
    }
  }