function test()
{
  waitForExplicitFinish();
  // Avoids the actual prompt
  setPermission(testPageURL, "indexedDB");
  executeSoon(test1);
}