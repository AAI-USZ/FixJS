function finishTest()
{
  resetUnlimitedQuota();

  SimpleTest.executeSoon(function() {
    testGenerator.close();
    SimpleTest.finish();
  });
}