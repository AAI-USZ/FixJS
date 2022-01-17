f    var failed, numProblems = 0, i, alert, needRefresh = false, syncAndMethod = [];
    try {
      failed = generalParseMsg(responseText);
      if (failed && failed.length > 0) {
        numProblems = failed.length;
        log("Have " + failed.length + " failed commands: ");
        for (i = 0; i < failed.length; i += 1) {
          log(JSON.stringify(failed[i]));
          if (failed[i].status.cmdName === "Alert" && failed[i].status.data === "508") { //server requires refresh.
          //TODO: this does not really work for more than one source, right??
          //if (failed[i].status.cmdRef === lastMsg.getBody().alerts[0].cmdId) { //got response to cmdRef.
            log("No problem, server just wants a refresh.");
            logToApp("Server requested slow sync.");
            needRefresh = true;
            numProblems -= 1;
          } else {
            logToApp("Cmd " + failed[i].status.cmd + " failed. Code: " + failed[i].status.data);
          }
        }
      }
      if (numProblems) {
        log(numProblems + " real problems left... break.");
        resultCallback({success: false});
        return;
      } else {
        //server will answer with sync-alerts, which might have a different sync mode, like slow for first sync:
        //TODO: maybe some other server will already send a sync cmd with data here?? See if that happens...
        willBeSynced = []; //empty willBeSynced.
        for (i = 0; i < lastMsg.getBody().alerts.length; i += 1) {
          alert = lastMsg.getBody().alerts[i];
          //log("Alert: " + JSON.stringify(alert));
          if (alert.items && alert.items[0]) {
            if (account.datastores[alert.items[0].target]) {
              if (alert.data) {
                log("Got " + alert.items[0].target + " method: " + alert.data);
                if (account.datastores[alert.items[0].target].method === "205" && alert.data === "201") {
                  log("Requested refresh from server, won't switch to slow sync.");
                } else {
                  account.datastores[alert.items[0].target].method = SyncMLAlertCodes[alert.data];
                }
                log("adding " + alert.items[0].target + " to will be synced.");
                willBeSynced.push(alert.items[0].target);
		syncAndMethod.push(alert.items[0].target + " method " + SyncMLAlertCodes[alert.data]);
                account.datastores[alert.items[0].target].state = "receivedInit";
                log("willbesynced: " + alert.items[0].target + " method " + SyncMLAlertCodes[alert.data]);
                needRefresh = false;
              }
              if (alert.items && alert.items[0] && alert.items[0].meta && alert.items[0].meta.anchor && alert.items[0].meta.anchor.last) {
                account.datastores[alert.items[0].target].serverLast = account.datastores[alert.items[0].target].serverNext;
                log("Got server-last: " + alert.items[0].meta.anchor.last + " and have own server-last: " + account.datastores[alert.items[0].target].serverLast);
                if (account.datastores[alert.items[0].target].serverLast !== alert.items[0].meta.anchor.last) {
                  log("Lasts do not match. Hopefully server told us to do slow sync.");
                }
              }
              if (alert.items && alert.items[0] && alert.items[0].meta && alert.items[0].meta.anchor && alert.items[0].meta.anchor.next) {
                log("Got next: " + alert.items[0].meta.anchor.next + " for server, save.");
                account.datastores[alert.items[0].target].serverNext = alert.items[0].meta.anchor.next;
              }
            }
          }
        }
        if (needRefresh) {
          logToApp("Could not find datastore for requested refresh.");
          log("Server told us that we need to refresh, but did not send a alert for that... fail. :(");
          resultCallback({success: false});
          return;
        }
        logToApp("Will sync " + JSON.stringify(syncAndMethod));
        getSyncData();
      }
    } catch (e) {
      logError_lib(e);
    }
  }
