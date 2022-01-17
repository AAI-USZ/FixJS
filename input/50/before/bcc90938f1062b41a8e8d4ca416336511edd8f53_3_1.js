function test()
{
  waitForExplicitFinish();
  // We want the prompt.
  setPermission(testPageURL, "indexedDB", "allow");
  executeSoon(test1);
}