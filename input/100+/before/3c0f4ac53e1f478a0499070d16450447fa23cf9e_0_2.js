function (callback) {
		  var i, ds, datastores = [], doPutDevInfo = false;
		  try {
		    nextMsg = syncMLMessage();
		    nextMsg.addCredentials(account);
		    nextMsg.setFinal(true);
		    resultCallback = callback;

		    for (i = 0; i < dsNames.length; i += 1) {
		      ds = account.datastores[dsNames[i]];
		      if (ds) {
		        ds.last = ds.next;
		        ds.next = (new Date().getTime() / 1000).toFixed();
		        nextMsg.addAlert({
		          data: SyncMLModes[ds.method],
		          items: [{
		            target: ds.path,
		            source: dsNames[i],
		            meta: { anchor: { next: ds.next, last: ds.last }}
		          }]
		        });
		        datastores.push({name: ds.name, type: ds.type});

		        if (!ds.serverType || !ds.serverId) {
              doPutDevInfo = true;
		          nextMsg.doGetDevInfo();
		        }
            if (ds.method === 201 || ds.method === 203 || ds.method === 205) {
              doPutDevInfo = true;
            }
		      }
		    }
        if (doPutDevInfo) { //devInfo will be send, if we don't know anything about the server 
                          //or if we need to do slow sync, or refresh from client/server.
          putDevInfo(nextMsg, datastores, {type: "Put"});
        }

		    logToApp("Sending initialization message to server.");
		    sendToServer(nextMsg, parseInitResponse);
		  } catch (e) {
	      logError_lib(e);
	    }
		}