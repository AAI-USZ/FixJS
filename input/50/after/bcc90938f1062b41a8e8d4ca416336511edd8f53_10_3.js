function finishTest()
{
  resetUnlimitedQuota();
  resetIndexedDB();

  SimpleTest.executeSoon(function() {
    testGenerator.close();
    //clearAllDatabases(function() { SimpleTest.finish(); });
    SimpleTest.finish();
  });
}