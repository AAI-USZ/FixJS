function(result, exception) {
      ok(result instanceof Components.interfaces.nsIIDBDatabase,
         "First database creation was successful");
      ok(!exception, "No exception");
      is(getPermission(testPageURL, "indexedDB"),
         Components.interfaces.nsIPermissionManager.UNKNOWN_ACTION,
         "Correct permission set");
      gBrowser.removeCurrentTab();
      executeSoon(test2);
    }