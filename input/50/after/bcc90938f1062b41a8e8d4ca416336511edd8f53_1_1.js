function test()
{
  waitForExplicitFinish();
  // Avoids the prompt
  setPermission(testPageURL1, "indexedDB");
  setPermission(testPageURL2, "indexedDB");
  executeSoon(test1);
}