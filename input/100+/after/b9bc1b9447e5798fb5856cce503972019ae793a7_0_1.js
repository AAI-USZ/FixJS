function (account) {
		  var query, calendar, obs, resfuture = new Future({returnValue: false});
			query = { from: "info.mobo.syncml.calendar:1", where: [ { prop: "accountId", op: "=", val: account.accountId } ] };

			//log("Check calendar.");
			if (!account && !account.accountId) {
			  //log("Did not get account! => failure.");
			  return resfuture;
			}
			if (account.datastores.calendar) {
        //log("Have Calendar Id: " + account.datastores.calendar.dbId);
        resfuture = DB.find(query, false, false).then(
          function (future) {
            var result = future.result, results, i, calPresent = false;
            if (result.returnValue === true) {
              results = result.results;
              for (i = 0; i < results.length; i += 1) {
                if (results[i]._id === account.datastores.calendar.dbId) {
                  log("Found calendar, everything ok.. :)");
                  future.result = {returnValue: true};
                  calPresent = true;
                }
              }
              if (!calPresent && results.length > 0) {
                account.datastores.calendar.dbId = results[0]._id;
                calPresent = true;
                future.result = {returnValue: true};
                log("Calendar was not associated with our account object...? Repaired that.");
              }
            }
            
            if (!calPresent) {
              //no calendar => create one.
              account.datastores.calendar.dbId = undefined;
              calendar = {
                "_kind": "info.mobo.syncml.calendar:1",
                "accountId": account.accountId,
                "color": "purple",
                "excludeFromAll": false,
                "isReadOnly": false,
                "name": (account.name || "SyncML") + " Calendar",
                "syncSource": "info.mobo.syncml"
              };
              obs = [calendar];

              resfuture = DB.put(obs).then(
                function (f1) {
                  if (f1.result.returnValue === true) {
                    log("Created calendar: " + JSON.stringify(f1.result.results));
                    if (f1.result.results.length > 0) {
                      account.datastores.calendar.dbId = f1.result.results[0].id;
                      SyncMLAccount.setAccount(account);
                      SyncMLAccount.saveConfig();
                      f1.result = {returnValue: true};
                    } else {
                      log("Error: Add returned no ID??");
                      f1.result = {returnValue: false};
                    }
                  } else {
                    log("Could not add calendar: " + f1.result.errorCode + " = " + f1.result.errorMessage);
                    f1.result = {returnValue: false};
                  }
                }
              );
              resfuture.onError(function (f) {
                log("Error in checkCalendar-future: " + f.exeption);
                logToApp("Could not create Calendar: " + JSON.stringify(f.exeption));
                resfuture.result = { returnValue: false };
              });
            }
          }
        );
        resfuture.onError(function (f) {
          log("Error in checkCalendar-future: " + f.exeption);
          logToApp("Could not find Calendar: " + JSON.stringify(f.exeption));
          resfuture.result = { returnValue: false };
        }); 
      }
			return resfuture;
		}