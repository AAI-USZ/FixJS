function test()
{
  waitForExplicitFinish();
  // Avoids the prompt
  setPermission(testPageURL1, "indexedDB", "unknown");
  setPermission(testPageURL2, "indexedDB", "unknown");
  executeSoon(test1);
}