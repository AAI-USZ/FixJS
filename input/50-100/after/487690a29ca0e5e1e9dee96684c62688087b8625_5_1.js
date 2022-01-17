function(result) {
            is(result, "finished", "Got 'finished' result");
            is(getPermission(testPageURL, "indexedDB-unlimited"),
               Components.interfaces.nsIPermissionManager.ALLOW_ACTION,
               "Correct permission set");
            gBrowser.removeCurrentTab();
            unregisterAllPopupEventHandlers();
            executeSoon(test2);
          }