function (account) {
		  var query, calendar, obs, resfuture = new Future({returnValue: false});
			query = { from: "info.mobo.syncml.calendar:1", where: [ { prop: "accountId", op: "=", val: account.accountId } ] };

			//log("Check calendar.");
			if (!account && !account.accountId) {
			  //log("Did not get account! => failure.");
			  return resfuture;
			}
			if (account.datastores.calendar) {
				if (account.datastores.calendar.dbId !== undefined) {
					//log("Have Calendar Id: " + account.datastores.calendar.dbId);
				  resfuture = DB.find(query, false, false).then(
					  function (future) {
					    var result = future.result, results, i;
					    if (result.returnValue === true) {
					      results = result.results;
					      for (i = 0; i < results.length; i += 1) {
					        if (results[i]._id === account.datastores.calendar.dbId) {
					          log("Found calendar, everything ok.. :)");
					          future.result = {returnValue: true};
					          return;
					        }
					      }
					      //if we reached this point, calendar was not found..
					      //log("Calendar not found.. :(");
					      account.datastores.calendar.dbId = undefined;
					      eventCallbacks.checkCalendar(account).then(function (f) {
					        //transfer result to outer future.
					        resfuture.result = f.result;
					      });
					    }
					  }
					);
				  resfuture.onError(function (f) {
	          log("Error in checkCalendar-future: " + f.exeption);
	          logToApp("Could not find Calendar: " + JSON.stringify(f.exeption));
	          resfuture.result = { returnValue: false };
	        });
				} else {
					//log("Need to create calendar account.");

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
					  function (future) {
					    if (future.result.returnValue === true) {
					      log("Created calendar: " + JSON.stringify(future.result.results));
					      if (future.result.results.length > 0) {
					        account.datastores.calendar.dbId = future.result.results[0].id;
					        SyncMLAccount.setAccount(account);
					        SyncMLAccount.saveConfig();
					        future.result = {returnValue: true};
					      } else {
					        log("Error: Add returned no ID??");
					        future.result = {returnValue: false};
					      }
					    } else {
					      log("Could not add calendar: " + future.result.errorCode + " = " + future.result.errorMessage);
					      future.result = {returnValue: false};
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
			
			return resfuture;
		}