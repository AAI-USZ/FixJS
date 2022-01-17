function runTest()
{
  allowUnlimitedQuota();

  SimpleTest.waitForExplicitFinish();
  testGenerator.next();
}