function test()
{
  waitForExplicitFinish();
  // We want a prompt.
  setPermission(testPageURL, "indexedDB", "allow");
  executeSoon(test1);
}