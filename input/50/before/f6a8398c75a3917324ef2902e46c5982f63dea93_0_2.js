function finishTest()
{
  resetUnlimitedQuota();
  resetIndexedDB();

  SimpleTest.executeSoon(function() {
    testGenerator.close();
    SimpleTest.finish();
  });
}