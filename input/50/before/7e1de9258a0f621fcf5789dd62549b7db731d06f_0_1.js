function runTest()
{
  allowIndexedDB();
  allowUnlimitedQuota();

  SimpleTest.waitForExplicitFinish();
  testGenerator.next();
}