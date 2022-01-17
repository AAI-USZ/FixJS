function finishTest()
{
  resetUnlimitedQuota();

  SimpleTest.executeSoon(function() {
    testGenerator.close();
    clearAllDatabases(function() { SimpleTest.finish(); });
  });
}