function(limitedQuota)
  {
    SimpleTest.waitForExplicitFinish();

    if (limitedQuota) {
      denyUnlimitedQuota();
    }
    else {
      allowUnlimitedQuota();
    }

    clearAllDatabases(function () { testGenerator.next(); });
  }