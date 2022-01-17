function(limitedQuota)
  {
    SimpleTest.waitForExplicitFinish();

    allowIndexedDB();
    if (limitedQuota) {
      denyUnlimitedQuota();
    }
    else {
      allowUnlimitedQuota();
    }

    clearAllDatabases(function () { testGenerator.next(); });
  }